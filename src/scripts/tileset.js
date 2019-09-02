let { TileEngine } = kontra
let tileEngine;
let img = new Image();
img.src = 'assets/Maytch 16x16 Tilesets/tilesheet_grass.png';
img.onload = function () {
    layers = []
    for (let i = 0; i < levels.length; i++) {
        layers.push({
            name: "lvl" + (i + 1),
            data: addClouds(levels[i].lvl)
        })
    }

    tileEngine = TileEngine({
        // tile size
        tilewidth: 16,
        tileheight: 16,

        // map size in tiles
        width: 20,
        height: 12,

        // tileset object
        tilesets: [{
            firstgid: 1,
            image: img
        }],

        // layer object
        layers: layers
    });

    addToRenderQueue(tileEngine, RENDER_QUEUE_TYPES.BACKGROUND, {})
}

const clouds = [[11, 12], [13, 14], [15, 16]]
function addClouds(lvl) {
    for (let i = 0; i < lvl.length; i++) {
        const tile = lvl[i];
        if (i < lvl.length - 1) {
            const nexttile = lvl[i + 1];

            if (i % 20 == 19 || tile !== nexttile) {
                continue;
            }

            switch (tile) {
                case 0:
                    if (Math.random() > 0.9) {
                        let cloud = Math.floor(Math.random() * 3);
                        lvl[i] = clouds[cloud][0];
                        lvl[i + 1] = clouds[cloud][1];

                    }
                    break;
            }
        }
    }
    return lvl;
}