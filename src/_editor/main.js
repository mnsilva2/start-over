window.onload = () => {
    updateAll();
    loadLevel();
}
const MAP_HEIGHT = 12;
const MAP_WIDTH = 20;
const TILES = 10;
let lvlEditor = document.getElementById("lvl-editor");
function loadLevel() {
    for (let i = 0; i < MAP_WIDTH; i++) {
        let container = document.createElement("div");
        for (let j = 0; j < MAP_HEIGHT; j++) {
            let select = document.createElement("select");
            for (let k = 0; k < TILES; k++) {
                let option = document.createElement("option");
                option.value = k;
                option.innerText = k
                option.addEventListener("onchange", function () {
                    updatelvl(i + j * MAP_WIDTH, k);
                })
                select.appendChild(option);
            }
            container.appendChild(select)
        }
        lvlEditor.appendChild(container)
    }
}
function updatelvl(pos, value) {
    lvl[pos] = value;
    tileEngine.render()

}

let lvl = [
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 27, 00, 29, 00, 30, 00, 00, 01, 02, 03, 00, 32, 00, 00, 31, 48, 30, 00, 00,
    01, 02, 02, 02, 02, 02, 02, 02, 18, 18, 18, 02, 02, 02, 02, 02, 02, 02, 02, 03,
    17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
]
lvl.length = MAP_HEIGHT * MAP_WIDTH;

let texthint = document.getElementById("text-hint")
function updateAll() {
    document.getElementById("output").innerText = JSON.stringify({

        text: texthint.value,
        lvl: [
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
            00, 27, 00, 29, 00, 30, 00, 00, 01, 02, 03, 00, 32, 00, 00, 31, 48, 30, 00, 00,
            01, 02, 02, 02, 02, 02, 02, 02, 18, 18, 18, 02, 02, 02, 02, 02, 02, 02, 02, 03,
            17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
            17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
        ],
        spawns: [
            {
                x: 1,
                y: 5
            },
            {
                x: 2,
                y: 5
            },
        ],
        doors: [
            {
                switch: {
                    x: 5,
                    y: 4,
                },
                doors: [
                    {
                        x: 09,
                        y: 07,
                        tileOff: 20,
                        tileOn: 0
                    },
                    {
                        x: 09,
                        y: 06,
                        tileOff: 20,
                        tileOn: 0
                    },
                    {
                        x: 09,
                        y: 05,
                        tileOff: 20,
                        tileOn: 0
                    },
                    {
                        x: 09,
                        y: 04,
                        tileOff: 4,
                        tileOn: 0
                    }
                ]
            }
        ],
        end: {
            x: 16, y: 4
        }

    }, null, 2)
}