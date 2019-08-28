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
        let gridX = Math.floor(self.x / 16);
        let gridY = Math.floor(self.y / 16) + 1;
        if (lvl[gridY * 20 + gridX + 1] == 01 || gridX == 20) {
            hitting.right = true;
        }
        if (lvl[gridY * 20 + gridX] == 03 || gridX <= -1) {
            hitting.left = true;
        }
        if (lvl[((gridY + 1) * 20) + gridX] !== 00 || lvl[((gridY + 1) * 20) + gridX + 1] !== 00) {
            hitting.down = true;
        }
        return hitting;
    },
    alignDown: () => {
        let self = mainCharacter;
        self.y = Math.floor(self.y / 16) * 16;
    }
});


