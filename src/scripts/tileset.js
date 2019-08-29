let { TileEngine } = kontra
let tileEngine;
let img = new Image();
img.src = 'assets/Maytch 16x16 Tilesets/tilesheet_grass.png';
img.onload = function () {


    const clouds = [[11, 12], [13, 14], [15, 16]]
    // for (let i = 0; i < lvl1.length; i++) {
    //     const tile = lvl1[i];
    //     if (i < lvl1.length - 1) {
    //         const nexttile = lvl1[i + 1];

    //         if (i % 20 == 19 || tile !== nexttile) {
    //             continue;
    //         }

    //         switch (tile) {
    //             case 0:
    //                 if (Math.random() > 0.9) {

    //                     let cloud = Math.floor(Math.random() * 3);
    //                     // console.log(clouds[cloud])
    //                     lvl1[i] = clouds[cloud][0];
    //                     lvl1[i + 1] = clouds[cloud][1];

    //                 }
    //                 break;
    //         }
    //     }
    // }

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
        layers: [{
            name: 'lvl1',
            //dirt tiles 
            data: levels[currentLvl].lvl
        }]
    });

    addToRenderQueue(tileEngine, RENDER_QUEUE_TYPES.BACKGROUND, {})
}