// let { Sprite } = kontra

let mainCharacter = Sprite({
    x: 0,
    y: 64,
    color: 'red',
    width: 16,
    height: 32,
    isJumping: false,
    isFalling: false,
    jumpIndex: 20,


    isHittingSolid: (lvl) => {
        let hitting = {
            left: false,
            right: false,
            down: false
        }
        let self = mainCharacter;
        // console.log("this", self)
        // console.log("gridX", self.x / 16)
        // console.log("gridY", self.y / 16)
        let gridX = Math.floor(self.x / 16);
        let gridY = Math.floor(self.y / 16) + 1;
        // console.log(gridY * 20 + gridX, lvl[gridY * 20 + gridX]);
        if (lvl[gridY * 20 + gridX + 1] == 01 || gridX == 20) {
            hitting.right = true;
        }
        if (lvl[gridY * 20 + gridX] == 03 || gridX <= -1) {
            hitting.left = true;
        }
        if (lvl[((gridY + 1) * 20) + gridX] !== 00) {
            console.log(gridY * 20 + gridX, lvl[gridY * 20 + gridX]);
            hitting.down = true;
        }
        return hitting;
    },
    // jumpArc() {
    //     const arc = [4, 3, 2, 1, 0, 0, -1, -2, -3, -4];
    //     const speed = arc[mainCharacter.jumpIndex];
    //     mainCharacter.jumpIndex++;
    //     console.log(mainCharacter.jumpIndex);
    //     return speed;
    // }
});


