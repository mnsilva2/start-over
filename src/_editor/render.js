let { init, Sprite, GameLoop, initKeys, keyPressed, SpriteSheet, Animation, TileEngine } = kontra
let { canvas } = init();

let tileEngine;
let img = new Image();
img.src = '../assets/Maytch 16x16 Tilesets/tilesheet_grass.png';
img.onload = function () {
    console.log("lvl", lvl)
    tileEngine = TileEngine({
        // tile size
        tilewidth: 16,
        tileheight: 16,

        // map size in tiles
        width: 20,
        height: 12,

        // tileset object
        tilesets: [{
            name: 'ground',
            data: lvl
        }]

    });
    tileEngine.render()
}
let loop = GameLoop({
    update: function () { },
    render: function () { // render the game state
        if (tileEngine) {
            tileEngine.render();
        }
    }
});

loop.start();