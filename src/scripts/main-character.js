const walls = [1, 3, 17, 19]
const bg = [0, 11, 12, 13, 14, 15, 16, 27, 28, 29, 30, 31, 32]

mainCharacter = Sprite({
    x: 32,
    y: 0,
    color: 'red',
    width: 16,
    height: 32,
    isJumping: false,
    isFalling: true,
    jumpIndex: 0,

    move: () => {
        if (keyPressed('d') || keyPressed('right')) {
            mainCharacter.x += 1
            console.log("anda")

            if (mainCharacter.isHittingSolid(lvl1).right) {
                mainCharacter.x -= 1
            }
        }
        if (keyPressed('a') || keyPressed('left')) {
            mainCharacter.x -= 1
            console.log("anda")
            if (mainCharacter.isHittingSolid(lvl1).left) {
                mainCharacter.x += 1
            }
        }
        if (mainCharacter.isFalling) {
            mainCharacter.y += (mainCharacter.jumpIndex ** 2) * 0.01
            if (mainCharacter.jumpIndex > -30)
                mainCharacter.jumpIndex--;
            if (mainCharacter.isHittingSolid(lvl1).down) {
                mainCharacter.isFalling = false;
                mainCharacter.alignDown();
            }
        } else {
            if (mainCharacter.isJumping) {
                mainCharacter.y -= (mainCharacter.jumpIndex ** 2) * 0.01
                mainCharacter.jumpIndex--;
                if (mainCharacter.jumpIndex <= 0) {
                    mainCharacter.isFalling = true;
                    mainCharacter.isJumping = false;
                }
            } else {
                if (keyPressed('w') || keyPressed('up')) {
                    mainCharacter.isJumping = true;
                    mainCharacter.jumpIndex = 20
                }
                if (!mainCharacter.isHittingSolid(lvl1).down) {
                    mainCharacter.isFalling = true;
                    mainCharacter.jumpIndex = 0;
                }

            }
        }
    },
    isHittingSolid: (lvl) => {
        let hitting = {
            left: false,
            right: false,
            down: false
        }
        let self = mainCharacter;
        letgridXLeft = Math.floor((self.x) / 16);
        letgridXRight = Math.floor((self.x + self.width) / 16);
        let gridY = Math.floor(self.y / 16) + 1;
        if (walls.includes(lvl[gridY * 20 + letgridXLeft]) || walls.includes(lvl[gridY * 20 + letgridXRight]) || letgridXRight == 20) {
            hitting.right = true;
        }
        if (walls.includes(lvl[gridY * 20 + letgridXLeft]) || walls.includes(lvl[gridY * 20 + letgridXRight]) || letgridXLeft <= -1) {
            hitting.left = true;
        }
        if (!bg.includes(lvl[((gridY + 1) * 20) + letgridXLeft]) || !bg.includes(lvl[((gridY + 1) * 20) + letgridXRight])
        ) {
            hitting.down = true;
        }
        return hitting;
    },
    alignDown: () => {
        let self = mainCharacter;
        self.y = Math.floor(self.y / 16) * 16;
    }
});


