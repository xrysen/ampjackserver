const express = require("express");
const app = express();
const ampCors = require("@ampproject/toolbox-cors");
const PORT = process.env.PORT || 8000;
const session = require("express-session");
const game = require("./AMPJack");

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000,secure: false, httpOnly: true
},
}))

app.use(
    ampCors({
      verifyOrigin: false,
      email: true,
      allowCredentials: true,
    })
  );

app.use((req, res, next) => {
    const s = req.session;
    if(!s.initialized) {
        s.initialized = true;
        s.deck = [];
        s.playerTotal = 0;
        s.dealerTotal = 0;
        s.gameStatus = "";
        s.gameState = "Playing";
        s.deck = game.createDeck(game.cards);
        game.shuffleDeck(s.deck);
        s.playersHand = [];
        s.dealersHand = [];
        s.topCard = 0;
        game.deal(s.deck, s.playersHand, s.dealersHand, s.topCard);
    }
    next();
})

app.get("/gameStatus", (req, res) => {
   const s = req.session;
    setTimeout(() => {
        console.log("Game Status", s.id);
        s.playerTotal = game.getTotal(s.playersHand);
        s.dealerTotal = game.getTotal(s.dealersHand);
        if (s.playerTotal === s.dealerTotal && gameState !== "Playing") {
            s.gameState = "push";
            s.gameStatus = "Push! No Winner!";
        } else if (s.playerTotal > 21 && s.gameState !== "Playing") {
            s.gameState = "bust";
            s.gameStatus = "Bust! Dealer wins!";
        } else if (s.gameState !== "Playing" && s.playerTotal > s.dealerTotal) {
            s.gameState = "won";
            s.gameStatus = `${playerName} Wins!`;
        } else if (s.dealerTotal > 21 && s.gameState !== "Playing") {
            s.gameState = "dealer bust";
            s.gameStatus = `Dealer Busts! Player Wins!`
        } else if (s.gameState !== "Playing" && s.dealerTotal > s.playerTotal) {
            s.gameState = "lose";
            gameStatus = "Dealer Wins!";
        }
        res.json({items: [{
            gameStatus: s.gameStatus
        }]})
    }, 500)
})

app.get("/playerCards", (req, res) => {
    const s = req.session;
    setTimeout(() => {
        console.log("PlayerCards", s.id);
        s.playerTotal = game.getTotal(s.playersHand);
        if (s.playerTotal > 21) {
            s.gameState = "bust";
        }
        res.json({items: [{
            playersHand: s.playersHand,
            total: `Player's Total: ${s.playerTotal}`,
            status: s.gameStatus
        }]})
    }, 300)
})

app.post("/hit", (req, res) => {
    const s = req.session;
    console.log("Hit!", s.id);
    s.playersHand.push(s.deck[s.topCard]);
    s.playerTotal = game.getTotal(s.playersHand);
    if(s.playerTotal > 21) {
        s.gameState = "bust";
        s.gameStatus = "Bust! Dealer Wins!";
    }
    s.topCard++;
    res.json({ items: [{ result: "Success"}]})
});

app.post("/stay", async (req, res) => {
    const s = req.session;
    console.log("Stay!", s.id);
    await game.dealersTurn(s.dealersHand, s.topCard, s.gameState);
    res.json({items: [ { result: "Success"}]})
})

app.get("/dealersCards", async (req, res) => {
    const s = req.session;
    console.log("dealerCards", s.id);
    const dealerTotal = await game.getDealerTotal(s.dealersHand);
    const dealerCards = await game.showDealerCards(s.gameState, s.dealersHand);
    res.json({items: [ {
        dealersHand: dealerCards,
        dealerTotal: dealerTotal
    }]})
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

