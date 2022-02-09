const express = require("express");
const app = express();
const ampCors = require("@ampproject/toolbox-cors");
const PORT = process.env.PORT || 8000;
const session = require("express-session");
const game = require("./AMPJack");

app.use(
    ampCors({
        verifyOrigin: false,
        email: true,
        allowCredentials: true
    })
)

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'asdfz###@$a123',
  proxy: true,
  name: "AMPJack",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use((req, res, next) => {
    console.log(`Session id: ${req.session.id}`)
    if(!req.session.initialised) {
        req.session.initialised = true;
        req.session.playerTotal = 0;
        req.session.dealerTotal = 0;
        req.session.gameStatus = "";
        req.session.gameState = "Playing";
        req.session.playersHand = [];
        req.session.dealersHand = [];
        req.session.playerName = "";
        req.session.topCard = 0;
        req.session.deck = game.createDeck();
        game.shuffleDeck(req.session.deck);
        game.deal(req.session.playersHand, req.session.dealersHand, req.session.deck, req.session.topCard);
        req.session.save();
    }
    next();
})

app.get("/AMPJack", async (req, res) => {
    const s = req.session;
    setTimeout(() => {
        s.playerTotal = game.getTotal(s.playersHand);
        s.dealerTotal = game.getTotal(s.dealersHand);
        if (s.playerTotal === s.dealerTotal && s.gameState !== "Playing") {
            s.gameState = "push";
            s.gameStatus = "Push! No Winner!";
        } else if (s.playerTotal > 21 && s.gameState !== "Playing") {
            s.gameState = "bust";
            s.gameStatus = "Bust! Dealer wins!";
        } else if (s.gameState !== "Playing" && s.playerTotal > s.dealerTotal) {
            s.gameState = "won";
            s.gameStatus = "Player Wins!"
        } else if (s.dealerTotal > 21 && s.gameState !== "Playting") {
            s.gameState = "dealer bust";
            s.gameStatus = "Dealer Busts! Player Wins!"
        }
    }, 500)
    setTimeout(() => {
        s.playerTotal = game.getTotal(s.playersHand);
        if (s.playerTotal > 21) {
            s.gameState = "bust";
        }
    }, 300)
    const dealerTotal = await game.getDealerTotal(s.dealersHand);
    const dealerCards  = await game.showDealerCards(s.dealersHand, s.gameState);

    res.json({items: [
        {
            gameStatus: s.gameStatus,
            playersHand: s.playersHand,
            total: `Player's Total: ${s.playerTotal}`,
            status: s.gameStatus,
            dealersHand: s.dealersCards,
            dealerTotal: s.dealerTotal
        }
    ]})
})

app.post("/hit", (req, res) => {
    const s = req.session;
    s.playersHand.push(s.deck[s.topCard]);
    s.playerTotal = game.getTotal(s.playersHand);
    if (s.playerTotal > 21) {
        s.gameState = "bust";
        s.gameStatus = "Bust! Dealer Wins!"
    }
    s.topCard++;
    res.json({items: [ { result: "It worked! "}]})
})

app.post("/stay", async (req, res) => {
    const s = req.session;
    console.log("Stay!");
    await game.dealersTurn(s.gameState, s.dealersHand, s.deck, s.topCard);
    res.json({items: [ { result: "Success! "}]})
})

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
