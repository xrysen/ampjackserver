const express = require("express");
const app = express();
const ampCors = require("@ampproject/toolbox-cors");
const PORT = process.env.PORT || 8000;
const session = require("express-session");

app.use(
    ampCors({
        verifyOrigin: false,
        email: true,
        allowCredntials: true
    })
);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

class Card {
    constructor(name, value, suit, img) {
        this.name = name;
        this.value = value;
        this.suit = suit;
        this.img = img;
    }
}

const cards = [
    new Card("Ace", 11, "Spades", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoibDVNa0w1d3dSUk81cU1XcldWeGUifQ==,signature:8796762eb702bfa0bf7b9d8c8742bdc93d1854cb55f5db8d0fec11b0b9efba89/l5MkL5wwRRO5qMWrWVxe"),
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
    new Card("Ace", 11, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiY05aRVJlUTBTQXFvdGdtbFFJZDIifQ==,signature:8200b6e7927a988f8e195ec4c5931395c42f7544b8b8f13f8237c49797eba868/cNZEReQ0SAqotgmlQId2"),
    new Card("Two", 2, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiNWp6Z1h2R3ZUZm1NcFAyNWhkSmoifQ==,signature:3333508d73a26849dc089964703781258c0fc683004b1c45093d31084c323f4c/5jzgXvGvTfmMpP25hdJj"),
    new Card("Three", 3, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiSEc5dGVuS3VTd3FHb3FUeU02RlUifQ==,signature:750c27289d43ec319607252b8a0e65b48c4079e828666686887c3503a4dc2a17/HG9tenKuSwqGoqTyM6FU"),
    new Card("Four", 4, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiSjRTRHZoRVQ1UzFXWmxic1VhRkEifQ==,signature:b959af9666cc1d9bd0759e365333c629d49f43e5948125949ecb857879859a0c/J4SDvhET5S1WZlbsUaFA"),
    new Card("Five", 5, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiN1JiazR0TmhTenlCTWQ4UmJJSjcifQ==,signature:4bf415a523bf133e5d2ff51e53e3070f93fdd3de6e7d4819bb530ccf4670a12f/7Rbk4tNhSzyBMd8RbIJ7"),
    new Card("Six", 6, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiOUxBalZRUUhSVm13MjJMYkpud1AifQ==,signature:038129aba60c66263bbd2f08c3fc12ba82e27ac9fb9a5ebf2561e81021c202bb/9LAjVQQHRVmw22LbJnwP"),
    new Card("Seven", 7, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoid2IyUWR5QThSNFNqdjBtYWtmem0ifQ==,signature:a3f11d2274407a70529743ef8927d8c42851bbff5b6477e7f8a23b8dcb44f573/wb2QdyA8R4Sjv0makfzm"),
    new Card("Eight", 8, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoibjRjVU5ndFQ0U3ZlZG9FdHVtVTIifQ==,signature:4278a6fa61e0c8106335cd7d03b97cc0c1e30307171cd86fe42e4f6fbbb994ac/n4cUNgtT4SvedoEtumU2"),
    new Card("Nine", 9, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiSWRPSm41U1RLSzVwYk50T0VrMUEifQ==,signature:8080c164efa3b5d3bd0b6500d59885eff250a4c7e9434020a5e64a887838b2d1/IdOJn5STKK5pbNtOEk1A"),
    new Card("10", 10, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiYm16OVlEZnpRYTJhdnNMcXJObWsifQ==,signature:b1143d431c18a9b4bedad63f29106efcdb87145765d668284cba52b4c0eba566/bmz9YDfzQa2avsLqrNmk"),
    new Card("Jack", 10, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiWVFGeTRxZVNTdUNPbjJFVkxPTTcifQ==,signature:c6d006a0146617613c54702abac96458020bd7f4f48ffa04a65bf075f3ff1cb6/YQFy4qeSSuCOn2EVLOM7"),
    new Card("Queen", 10, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiSVBnbVVhYk9UZzZHQlVqblk5dDkifQ==,signature:54aa879e8094ac812da7ca815fce63bf8a1755a649c1ce9bd9480bfbf6fdfa75/IPgmUabOTg6GBUjnY9t9"),
    new Card("King", 10, "Clubs", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoieksyN2Z3ZDdURjJZTG5PbXVEZ28ifQ==,signature:cd462e7083879443975dbf3f787949cc408d0898961a9c7337414007f3931913/zK27fwd7TF2YLnOmuDgo"),
    new Card("Ace", 11, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoieFpWSUJGVFJ5bUJsWkxiQWhuY2kifQ==,signature:5972cf7ad069534fc2d57933230879c558c1223bbcc8808b85f7ed2f36653791/xZVIBFTRymBlZLbAhnci"),
    new Card("Two", 2, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiYTZYUm5mWlVTOGlMVEZPS3Qyd0MifQ==,signature:2a5ea88af8d598b40b56d59e19506394955db594945472428ebf0ea9461db6af/a6XRnfZUS8iLTFOKt2wC"),
    new Card("Three", 3, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoia1dMNVdGMjJTQ3lFanR0dG1IZXcifQ==,signature:06506149ede845f8bb109d79ded6718d9a4d9296f1d4f95affdad5fe98566628/kWL5WF22SCyEjtttmHew"),
    new Card("Four", 4, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiNU9XdThpN0dScTYwM2FWaDVGeWcifQ==,signature:03ea9f8e3e58de1e4d0b3cb303704637515b6ed978530b6147e9f88b55d7b1a2/5OWu8i7GRq603aVh5Fyg"),
    new Card("Five", 5, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiV3QxVEhRQVE2cVcwY3lyR2N4WncifQ==,signature:d39c650444952bf72abc41475ac3424a856ef902611aa79051f920fc9524f56b/Wt1THQAQ6qW0cyrGcxZw"),
    new Card("Six", 6, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoielZtd09LZGVUVHFRNWlzaDhsSlYifQ==,signature:8ff50cc15ab87c333e573e4dd399e7c26e8f7c17bec5548b51c3c4693e5774bd/zVmwOKdeTTqQ5ish8lJV"),
    new Card("Seven", 7, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoibEVWYmRYUFJTNm1TTTJRTlN6aFcifQ==,signature:336163483c61d26996ca5e9904e2e5390e9209a36605dbadcad3f0e0c40928d5/lEVbdXPRS6mSM2QNSzhW"),
    new Card("Eight", 8, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiYUtNVjJzYUJScUc3MGlxSTM2dUIifQ==,signature:3f211b35a493d9160cf76ac32e473296e3e1031f83200405ace105bdcc163a3d/aKMV2saBRqG70iqI36uB"),
    new Card("Nine", 9, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiR1U5VUN2Um1SVTZ4bnVBMXZsWGYifQ==,signature:e38788709c3779f9f10f17ef8964c64541bd437dfa219c53702d64e44859e832/GU9UCvRmRU6xnuA1vlXf"),
    new Card("10", 10, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiZlpsSVJERlVUSFNISmtFWWJHOWoifQ==,signature:e8abe50a7ed07331324f8771eb1ef198bdbbb8997486261ab0d771e4f8091f5f/fZlIRDFUTHSHJkEYbG9j"),
    new Card("Jack", 10, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiYjdyUXE5bXpRamlmQzRkVzViREYifQ==,signature:834ccbe796f6919dcc82ce5cb052932c9064962ec705dfda3da987775392d152/b7rQq9mzQjifC4dW5bDF"),
    new Card("Queen", 10, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiRWVmaTlzc09UZWkwRjVKM0tqZkEifQ==,signature:ac1b1bde3027e3c5e079f26be5ae3eba46197df88769b79c71332aa94a167316/Eefi9ssOTei0F5J3KjfA"),
    new Card("King", 10, "Hearts", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiQ3F5QkoyQlJ0bWw1VnM0Y3Y4bnIifQ==,signature:433db00e749b4b9a0757760a988ce39eed2538a9f988b36cafca8e59104232b2/CqyBJ2BRtml5Vs4cv8nr"),
    new Card("Ace", 11, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiQmJGczZWdWZTRG0zRjViY2UzbXcifQ==,signature:f6546abbff153265eb55833b7e68724a52a80f94d77eabc5f1c6173b7990769c/BbFs6VufSDm3F5bce3mw"),
    new Card("Two", 2, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiM2RQY2tIVHJpRFRXZzNlNTlnQlEifQ==,signature:a0f4681e092cc6a6ad8223563a142f0328a7fae7003d5ae520f311b39899db75/3dPckHTriDTWg3e59gBQ"),
    new Card("Three", 3, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiZ202ZUszTkVRbzIyNFc0MVJuV2kifQ==,signature:dd27f3f475120a2848e3d0a2c9e92d7eb7372a238f5b0c5253e6baee22f57746/gm6eK3NEQo224W41RnWi"),
    new Card("Four", 4, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiUFZaVlVMNVJxNnhod0k4d2pHMmcifQ==,signature:1c8fa7b208dc514440e58568ccef5ade5c4e971311b18a8407b11513be265a10/PVZVUL5Rq6xhwI8wjG2g"),
    new Card("Five", 5, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiOFFjVHpqVWhUQmlYVXVVUjR3QmsifQ==,signature:677beb64d8b9d37228e1eaa2e8e16fc962c9ac0804ef5133d79bb5337366c92d/8QcTzjUhTBiXUuUR4wBk"),
    new Card("Six", 6, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiMEE0QkFwQ2lSY1dURE1CbElmMHoifQ==,signature:23fab4669029ed3374a15215994d0249cdcecfb4313b81d8c9a5bffebce70be4/0A4BApCiRcWTDMBlIf0z"),
    new Card("Seven", 7, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiTHBBSUY1Wm9SVldmUFNmR0sxeHEifQ==,signature:53301388253fb592f50930b1da90150e94a12944495218baa400d402847935ef/LpAIF5ZoRVWfPSfGK1xq"),
    new Card("Eight", 8, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoib1k0RjFuYklUeFM2WTlnbnBxNVYifQ==,signature:ed9f63bb2a1a7d7be87ca95012cf6f13bef6f27d8738ab9dea45e71557d62e41/oY4F1nbITxS6Y9gnpq5V"),
    new Card("Nine", 9, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiYmVibGxNNVNUWTY1dW4yZE5qWkIifQ==,signature:48e1d9bd28f3d02e1cc1e3e2d69c0aba42f0c067810b481ca82ffb3cd21f5e13/bebllM5STY65un2dNjZB"),
    new Card("10", 10, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiak1xaEVjd1BRTWVkRzBLSEx6ajkifQ==,signature:0b38fff93dc71f1620a0fcf302e409e2c811ed26c5be1d65cea262c3ec03698c/jMqhEcwPQMedG0KHLzj9"),
    new Card("Jack", 10, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiRVBFeEZ0OVJ0dWs2TFV4SXAzR0cifQ==,signature:e0a743d8b45cc47263f4886da43ff33d78f4376285a43e6f5f138e8dd98ef361/EPExFt9Rtuk6LUxIp3GG"),
    new Card("Queen", 10, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoibFR3NjROTEhUdmVNdWNtZ2s5c2EifQ==,signature:efdca9327da1decebf289c5ff0501f2f64462588326ea468853692f97c0e0079/lTw64NLHTveMucmgk9sa"),
    new Card("King", 10, "Diamonds", "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiUFh5YlluNUlUWENVY05sS2lWd1IifQ==,signature:4802dcce57b96bb277a2d1e377486a75e4acee8da875b68a481f7f8cdb8da9f7/PXybYn5ITXCUcNlKiVwR")
];

const createDeck = () => {
    const deck = [];
    for (const card of cards) {
        deck.push(card);
    }
    return deck;
}

const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

const deal = (hand1, hand2, deck, topCard) => {
    hand1.push(deck[0], deck[2]);
    hand2.push(deck[1], deck[3]);
    topCard = 4;
}

const getTotal = (hand) => {
    let total = 0;
    for (card of hand) {
        total += card.value;
    }

    // Determine if Ace should equal 1 or 11
    for (card of hand) {
        if (total > 21 && card.name.includes("Ace")) {
            total -= 10;
        }
    }
    return total;
}

const getDealerTotal = (dealersHand) => {
    return new Promise((resolve, reject) => {
        let dealerTotal = getTotal(dealersHand);
        resolve(dealerTotal);
    })
}

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
        req.session.deck = createDeck();
        shuffleDeck(req.session.deck);
        deal(req.session.playersHand, req.session.dealersHand, req.session.deck, req.session.topCard);
    }
    next();
})

app.get("/gameStatus", (req, res) => {
    const s = req.session;
    setTimeout(() => {
        s.playerTotal = getTotal(s.playersHand);
        s.dealerTotal = getTotal(s.dealersHand);
        if (s.playerTotal === s.dealerTotal && s.gameState !== "Playing") {
            s.gameState = "push";
            s.gameStatus = "Push! No Winner!";
        } else if (s.playerTotal > 21 && s.gameState !== "Playing") {
            s.gameState = "bust";
            s.gameStatus = "Bust! Dealer wins!";
        } else if (s.gameState !== "Playing" && s.playerTotal > s.dealerTotal) {
            s.gameState = "won";
            s.gameStatus = `${s.playerName} Wins!`
        } else if (s.dealerTotal > 21 && s.gameState !== "Playing") {
            s.gameState = "dealer bust";
            s.gameStatus = `Dealer Busts! ${s.playerName} Wins!`
        } else if (s.gameState !== "Playting" && s.dealerTotal > s.playerTotal) {
            s.gameState = "lose";
            s.gameStatus = "Dealer Wins!";
        }
        res.json({items: [
            {
                gameStatus: s.gameStatus + Math.floor(Math.random(10)) * 1,
            }
        ]})
    }, 500)
})

app.get("/playerCards", (req, res) => {
    const s = req.session;
    setTimeout(() => {
        s.playerTotal = getTotal(s.playersHand);
        if (s.playerTotal > 21) {
            s.gameState = "bust";
        }
        res.json({items: [{
            playersHand: s.playersHand,
            total: `${s.playersName}'s Total: ${s.playerTotal}`,
            status: s.gameStatus
        }]})
    }, 300)
})

app.post("/hit", (req, res) => {
    const s = req.session;
    s.playersHand.push(s.deck[s.topCard]);
    s.playerTotal = getTotal(s.playersHand);
    if (s.playerTotal > 21) {
        s.gameState = "bust";
        s.gameStatus = "Bust! Dealer Wins!"
    }
    s.topCard++;
    res.json({items: [ { result: "It worked! "}]})
})

const dealersTurn = (gameState, dealersHand, deck, topCard) => {
    gameState = "standing";
    return new Promise((resolve, reject) => {
        while(getTotal(dealersHand) < 17) {
            dealersHand.push(deck[topCard]);
            topCard ++;
        }
        resolve();
    })
}

app.post("/stay", async (req, res) => {
    const s = req.session;
    console.log("Stay!");
    await dealersTurn(s.gameState, s.dealersHand, s.deck, s.topCard);
    res.json({items: [ { result: "Success! "}]})
})

const showDealerCards = (dealersHand, gameState) => {
    let dealerCards = [];
    return new Promise((resolve, reject) => {
        if (gameState === "standing") {
            dealersCards = dealersHand;
        } else {
            dealersCards = dealersHand.slice(1);
        }
        resolve(dealerCards);
    })
}

app.get("/dealerCards", async (req, res) => {
    const s = req.session;
    const dealerTotal = await getDealerTotal(s.dealersHand);
    const dealerCards = await showDealerCards(s.dealersHand, s.gameState);
    res.json({items: [ {
        dealersHand: dealerCards,
        dealerTotal: dealerTotal
    }]})
})

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
