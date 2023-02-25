var gameManager = require("./battleship/gameManager");
var test = require("./test");

exports.invite = (req, res) => {
    gameManager.start(req.headers, req.body)
    res.json({"success": true});
}

exports.placeShips = (req, res) => {
    gameManager.prepare(req.headers);
    gameManager.board.placeShips();
    res.json({"ships": gameManager.board.ships});
}

exports.shoot = (req, res) => {
    gameManager.prepare(req.headers);
    let shoots = gameManager.shotFired.shoot(req.body);
    res.json({"coordinates": shoots});
}

exports.notify = (req, res) => {
    gameManager.prepare(req.headers);
    res.send("NOT IMPLEMENT");
}

exports.gameOver = (req, res) => {
    gameManager.prepare(req.headers);
    res.json({ "success": true });
}

exports.view = (req, res) => {
    test.testInvite().then(data => {
        // console.log(data);
        test.testPlaceShips().then(data => {
            // console.log(data);
            let rs = test.viewPlaceShip(gameManager);
            rs += "<br>";
            rs += test.viewShoot(gameManager);
            res.send(rs);
        });
    });
}