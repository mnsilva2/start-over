const walls = [1, 3, 4, 20, 17, 19,]
const bg = [0, 11, 12, 13, 14, 15, 16, 27, 28, 29, 30, 31, 32]

const MAX_SPEED = 2;
const ACCELARATION = 0.1
const DRAG = 0.8
const MAX_HEIGHT_JUMP = 20;
const MIN_HEIGHT_JUMP = 10;

let image = new Image();
image.src = "data:image/png;base64,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"
let spriteSheet = SpriteSheet({
    image: image,
    frameWidth: 16,
    frameHeight: 32,
    animations: {
        walk: {
            frames: '0..2',  // frames 0 through 9
            frameRate: 10,
            loop: true

        },
        idle: {
            // frames: [0, 0, 1, 2, 2, 1],  // frames 0 through 9
            frames: 0,
            frameRate: 10,
            loop: true
        }
    }
})


mainCharacter = Sprite({
    x: levels[currentLvl].spawns[0].x * 16,
    y: levels[currentLvl].spawns[0].y * 16,
    color: 'red',
    width: 16,
    height: 32,
    animations: spriteSheet.animations,
    isJumping: false,
    isFalling: true,
    jumpIndex: 0,
    currentSpeed: 0,

    move: () => {
        mainCharacter.playAnimation('walk')
        if (keyPressed('d') || keyPressed('right')) {
            // mainCharacter.playAnimation('walk')
            let oldX = mainCharacter.x;
            mainCharacter.x += mainCharacter.currentSpeed;

            if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).right) {
                mainCharacter.currentSpeed = mainCharacter.currentSpeed / 2;
                mainCharacter.x = oldX;

            } else {
                let changeDirectionModifier = 1
                if (mainCharacter.currentSpeed < 0) {
                    changeDirectionModifier = 2
                }
                if (mainCharacter.currentSpeed < MAX_SPEED) {
                    mainCharacter.currentSpeed = mainCharacter.currentSpeed + ACCELARATION * changeDirectionModifier;
                }
            }
        }
        if (keyPressed('a') || keyPressed('left')) {
            // mainCharacter.playAnimation('walk')
            let oldX = mainCharacter.x;
            mainCharacter.x += mainCharacter.currentSpeed;

            if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).left) {
                mainCharacter.currentSpeed = mainCharacter.currentSpeed / 2;
                mainCharacter.x = oldX;


            } else {
                let changeDirectionModifier = 1
                if (mainCharacter.currentSpeed > 0) {
                    changeDirectionModifier = 2
                }
                if (mainCharacter.currentSpeed > -MAX_SPEED) {
                    mainCharacter.currentSpeed = mainCharacter.currentSpeed - ACCELARATION * changeDirectionModifier;
                }
            }
        }
        if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).left) {
            mainCharacter.alignLeft();
        }
        if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).right) {
            mainCharacter.alignRight();
        }

        if (mainCharacter.currentSpeed < 0.1 && mainCharacter.currentSpeed > -0.1) {
            mainCharacter.currentSpeed = 0
        }
        if (!keyPressed('a') && !keyPressed('left') && !keyPressed('d') && !keyPressed('right')) {
            let oldX = mainCharacter.x;
            if (mainCharacter.currentSpeed < 0.1 && mainCharacter.currentSpeed > -0.1) {
                mainCharacter.currentSpeed = 0
                mainCharacter.centerPixel()
            } else {
                mainCharacter.currentSpeed = mainCharacter.currentSpeed * DRAG
                mainCharacter.x += mainCharacter.currentSpeed;
            }
            if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).left || mainCharacter.isHittingSolid(levels[currentLvl].lvl).right) {
                mainCharacter.x = oldX;
            }
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
        let letgridXLeft, letgridXRight, currentAccelaration = 0;
        let hitting = {
            left: false,
            right: false,
            down: false
        }
        let self = mainCharacter;
        if (mainCharacter.currentSpeed !== 0) {
            currentAccelaration = ACCELARATION;
        }
        if (mainCharacter.currentSpeed > 0) {
            letgridXLeft = Math.floor((self.x + (mainCharacter.currentSpeed + currentAccelaration)) / 16);
            letgridXRight = Math.floor((self.x + self.width + (mainCharacter.currentSpeed + currentAccelaration)) / 16);
        } else {
            letgridXLeft = Math.floor((self.x + (mainCharacter.currentSpeed - currentAccelaration)) / 16);
            letgridXRight = Math.floor((self.x + self.width + (mainCharacter.currentSpeed - currentAccelaration)) / 16);
        }

        let gridY = Math.floor(self.y / 16 + 1);
        if (walls.includes(lvl[gridY * 20 + letgridXRight]) || letgridXRight == 20) {
            hitting.right = true;
        }
        if (walls.includes(lvl[gridY * 20 + letgridXLeft]) || letgridXLeft <= -1) {
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
        self.y = Math.round(self.y / 16) * 16;
    },
    alignLeft: () => {
        let self = mainCharacter;
        self.x = (Math.round(self.x / 16) * 16);
    },
    alignRight: () => {
        let self = mainCharacter;
        // self.x = (Math.round(self.x / 16) * 16);
    },
    centerPixel: () => {
        let self = mainCharacter;
        self.x = Math.round(self.x);
    },
    isInEndSpot: function () {
        return (Math.round(this.x) === levels[currentLvl].end.x * 16 && Math.round(this.y) && levels[currentLvl].end.y * 16)


    }
});


