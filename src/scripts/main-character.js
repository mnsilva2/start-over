const walls = [1, 3, 17, 19]
const bg = [0, 11, 12, 13, 14, 15, 16, 27, 28, 29, 30, 31, 32]

const MAX_SPEED = 1.5;
const DRAG = 0.8
const MAX_HEIGHT_JUMP = 20;
const MIN_HEIGHT_JUMP = 10;

let image = new Image();

let spriteSheet = SpriteSheet({
    image: image,
    frameWidth: 72,
    frameHeight: 97,
    animations: {
        // create a named animation: walk
        walk: {
            frames: '0..9',  // frames 0 through 9
            frameRate: 30
        },
        idle: {
            frames: '0',  // frames 0 through 9
            frameRate: 30
        }
    }
})


mainCharacter = Sprite({
    x: 32,
    y: 0,
    color: 'red',
    width: 16,
    height: 32,
    animations: spriteSheet.animations,
    isJumping: false,
    isFalling: true,
    jumpIndex: 0,
    currentSpeed: 0,

    move: () => {
        if (keyPressed('d') || keyPressed('right')) {
            mainCharacter.playAnimation('walk')
            if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).right) {
                mainCharacter.currentSpeed = 0;
                mainCharacter.alignRight();
            } else {
                let changeDirectionModifier = 1
                if (mainCharacter.currentSpeed < 0) {
                    changeDirectionModifier = 2
                }
                if (mainCharacter.currentSpeed < MAX_SPEED) {
                    mainCharacter.currentSpeed = mainCharacter.currentSpeed + 0.1 * changeDirectionModifier;
                }
            }
        }
        if (keyPressed('a') || keyPressed('left')) {
            mainCharacter.playAnimation('walk')

            if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).left) {
                mainCharacter.currentSpeed = 0;
                mainCharacter.alignLeft();
            } else {
                let changeDirectionModifier = 1
                if (mainCharacter.currentSpeed > 0) {
                    changeDirectionModifier = 2
                }
                if (mainCharacter.currentSpeed > -MAX_SPEED) {
                    mainCharacter.currentSpeed = mainCharacter.currentSpeed - 0.1 * changeDirectionModifier;

                }
            }
        }

        mainCharacter.x += mainCharacter.currentSpeed;

        if (!keyPressed('a') && !keyPressed('left') && !keyPressed('d') && !keyPressed('right')) {
            mainCharacter.playAnimation('idle')
            if (mainCharacter.currentSpeed < 0.1 && mainCharacter.currentSpeed > -0.1) {
                mainCharacter.currentSpeed = 0
                mainCharacter.centerPixel()
            } else {
                mainCharacter.currentSpeed = mainCharacter.currentSpeed * DRAG
            }
        }
        if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).left || mainCharacter.isHittingSolid(levels[currentLvl].lvl).right) {
            mainCharacter.alignLeft()
            mainCharacter.alignRight()
        }

        if (mainCharacter.isFalling) {
            mainCharacter.y += (mainCharacter.jumpIndex ** 2) * 0.01
            if (mainCharacter.jumpIndex > -30)
                mainCharacter.jumpIndex--;
            if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).down) {
                mainCharacter.isFalling = false;
                mainCharacter.alignDown();
            }
        } else {
            if (mainCharacter.isJumping) {
                mainCharacter.y -= (mainCharacter.jumpIndex ** 2) * 0.01
                if ((keyPressed('w') || keyPressed('up')) && mainCharacter.jumpIndex > MIN_HEIGHT_JUMP) {
                    mainCharacter.jumpIndex -= .75;
                } else {
                    mainCharacter.jumpIndex -= 5;

                }

                if (mainCharacter.jumpIndex <= 0) {
                    mainCharacter.isFalling = true;
                    mainCharacter.isJumping = false;
                }
            } else {
                if (keyPressed('w') || keyPressed('up')) {
                    mainCharacter.isJumping = true;
                    mainCharacter.jumpIndex = MAX_HEIGHT_JUMP
                }
                if (!mainCharacter.isHittingSolid(levels[currentLvl].lvl).down) {
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
        let gridY = Math.floor(self.y / 16 + 1);
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
    },
    alignLeft: () => {
        let self = mainCharacter;
        self.x = (Math.round(self.x / 16) * 16) - 1;
    },
    alignRight: () => {
        let self = mainCharacter;
        self.x = (Math.round(self.x / 16) * 16);
    },
    centerPixel: () => {
        let self = mainCharacter;
        self.x = Math.round(self.x);
    },
    isInEndSpot: function () {
        return (Math.round(this.x) === levels[currentLvl].end.x * 16 && Math.round(this.y) && levels[currentLvl].end.y * 16)


    }
});


