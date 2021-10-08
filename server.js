const express = require("express");
const app = express();
const ampCors = require("@ampproject/toolbox-cors");
const multer = require("multer");
const multipart = multer();
const PORT = process.env.PORT || 8000;

app.use(
  ampCors({
    verifyOrigin: false,
    email: true,
    allowCredentials: true,
  })
);

class Card {
    constructor(name, value, suit, img) {
        this.name = name;
        this.value = value;
        this.suit = suit;
        this.img = img;
    }
}

const cards = [
    new Card("Ace", 1, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoibDVNa0w1d3dSUk81cU1XcldWeGUifQ==,signature:8796762eb702bfa0bf7b9d8c8742bdc93d1854cb55f5db8d0fec11b0b9efba89/l5MkL5wwRRO5qMWrWVxe"),
    new Card("Two", 2, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiUXA4eHY2cWdSbWVjdWdhV1ZLdzMifQ==,signature:676aa9482d7a446d9b8b40ce9591fbe05a68d9e617ed478e0ab94cdd8ce68a84/Qp8xv6qgRmecugaWVKw3"),
    new Card("Three", 3, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiTlVFQmptTFBTNHVrNnVpeTloVmYifQ==,signature:0999015126d5e8883c5434037d56cf547e09e55eeb19ed8bf2e0faebbb3dcc2c/NUEBjmLPS4uk6uiy9hVf"),
    new Card("Four", 4, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiQ1JwU2ZFZUFRdGFWQUpCWlF5VWIifQ==,signature:99f54ec0653ebd9222deeba62af596187fbfeab51be95f89a4b37fac5f36f2a1/CRpSfEeAQtaVAJBZQyUb"),
    new Card("Five", 5, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiMk9ENDhFTDdRZVNlb1dFWlhmSEsifQ==,signature:348ef16ff6823ff99f2d38e7e52cd83bea32e5a3fbd209b466ba65e59bca2892/2OD48EL7QeSeoWEZXfHK"),
    new Card("Six", 6, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiOGhoZFBUUnZTMDZoY2ZhM0Vrd3EifQ==,signature:6bc8c7a6bddd965305b69e7a72258a54e0af3bc37c1adcfe423f92b047a5b559/8hhdPTRvS06hcfa3Ekwq"),
    new Card("Seven", 7, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiS1VxUVlpUVVlN3pVckZ1bjFWaGcifQ==,signature:7ad2ec0860acc30ff216b6a6a37d77099e10b371820814d69ac6558d40425892/KUqQYiQUe7zUrFun1Vhg"),
    new Card("Eight", 8, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiOHltajdYU0lTa2Fmekd4TzdHWk0ifQ==,signature:377f3d38fbd9e39710473dcb164fa7997964a28455649357b72a04eaf5d113bb/8ymj7XSISkafzGxO7GZM"),
    new Card("Nine", 9, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiS3BJZDdNV1RSaXFOcmFjWm55SksifQ==,signature:e2f52d396921e1dd2c8ca39ec7e60ea6789ad4435cf195ab769454f024fd9506/KpId7MWTRiqNracZnyJK"),
    new Card("10", 10, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiZVJ1ZjhWem5ScTJHRVZKMmpYS08ifQ==,signature:1d4b7eea1d1f1ac43272ae03c98faa5c92c73dcab19ebbf7fd9594dad19d82f0/eRuf8VznRq2GEVJ2jXKO"),
    new Card("Jack", 10, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiNFVFR3hkM1NrbVJGYnhmaHZ6SUEifQ==,signature:d0cc3adb52bd2f313a304715d2ad2b5f81ef5696421bb4aff987f9cab853a080/4UEGxd3SkmRFbxfhvzIA"),
    new Card("Queen", 10, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiVlRUZkdPZnNSRGlSMmp0OUZBc2MifQ==,signature:5c0b62b7189d74957454cbc31988b25c6939d6f575dd30c0e7b2ab06eb0b00eb/VTTfGOfsRDiR2jt9FAsc"),
    new Card("King", 10, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiSWpuUFRhVkRRUXFIcHFsb0JsZlgifQ==,signature:080802136a87703f7553455c2ae0fd0293caf40835a553550a78bc4aa7ae1fe5/IjnPTaVDQQqHpqloBlfX"),
    new Card("Ace", 1, "Clubs", ""),
    new Card("Two", 2, "Clubs", ""),
    new Card("Three", 3, "Clubs", ""),
    new Card("Four", 4, "Clubs", ""),
    new Card("Five", 5, "Clubs", ""),
    new Card("Six", 6, "Clubs", ""),
    new Card("Seven", 7, "Clubs", ""),
    new Card("Eight", 8, "Clubs", ""),
    new Card("Nine", 9, "Clubs", ""),
    new Card("10", 10, "Clubs", ""),
    new Card("Jack", 10, "Clubs", ""),
    new Card("Queen", 10, "Clubs", ""),
    new Card("King", 10, "Clubs", ""),
    new Card("Ace", 1, "Hearts", ""),
    new Card("Two", 2, "Hearts", ""),
    new Card("Three", 3, "Hearts", ""),
    new Card("Four", 4, "Hearts", ""),
    new Card("Five", 5, "Hearts", ""),
    new Card("Six", 6, "Hearts", ""),
    new Card("Seven", 7, "Hearts", ""),
    new Card("Eight", 8, "Hearts", ""),
    new Card("Nine", 9, "Hearts", ""),
    new Card("10", 10, "Hearts", ""),
    new Card("Jack", 10, "Hearts", ""),
    new Card("Queen", 10, "Hearts", ""),
    new Card("King", 10, "Hearts", ""),
    new Card("Ace", 1, "Diamonds", ""),
    new Card("Two", 2, "Diamonds", ""),
    new Card("Three", 3, "Diamonds", ""),
    new Card("Four", 4, "Diamonds", ""),
    new Card("Five", 5, "Diamonds", ""),
    new Card("Six", 6, "Diamonds", ""),
    new Card("Seven", 7, "Diamonds", ""),
    new Card("Eight", 8, "Diamonds", ""),
    new Card("Nine", 9, "Diamonds", ""),
    new Card("10", 10, "Diamonds", ""),
    new Card("Jack", 10, "Diamonds", ""),
    new Card("Queen", 10, "Diamonds", ""),
    new Card("King", 10, "Diamonds", "")
];

console.log(`${cards[36].name} of ${cards[36].suit}`);


app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`);
})