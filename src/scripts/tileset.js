let { TileEngine } = kontra
let tileEngine;
let img = new Image();
img.src = 'assets/tileset.png';
img.onload = function () {
    tileEngine = TileEngine({
        // tile size
        tilewidth: 16,
        tileheight: 16,

        // map size in tiles
        width: 4,
        height: 2,

        // tileset object
        tilesets: [{
            firstgid: 1,
            image: img
        }],

        // layer object
        layers: [{
            name: 'lvl1',
            data: [0, 1, 2, 3,
                4, 5, 6, 7]
        }]
    });

    // renderQueue.push(tileEngine);
    addToRenderQueue(tileEngine, RENDER_QUEUE_TYPES.BACKGROUND, {})
}