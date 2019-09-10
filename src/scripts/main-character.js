const walls = [1, 3, 4, 20, 17, 19,]
const bg = [0, 11, 12, 13, 14, 15, 16, 27, 28, 29, 30, 31, 32]

const MAX_SPEED = 2;
const ACCELARATION = 0.1
const DRAG = 0.8
const MAX_HEIGHT_JUMP = 20;
const MIN_HEIGHT_JUMP = 10;
const MAIN_CHARACTER_WIDTH = 16;
let image = new Image();
image.src = "data:image/png;base64,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"
image.onload = function () {
    let spriteSheet = SpriteSheet({
        image: image,
        frameWidth: 16,
        frameHeight: 32,
        animations: {
            walk: {
                frames: [3, 4, 5, 6],  // frames 0 through 9
                frameRate: 10,
                loop: true

            },
            idle: {
                frames: [0, 0, 0, 0, 1, 2, 2, 2, 2, 1],  // frames 0 through 9
                // frames: '0..2',
                frameRate: 4,
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
            mainCharacter.playAnimation('idle')
            if (keyPressed('d') || keyPressed('right')) {
                mainCharacter.width = -16;
                mainCharacter.playAnimation('walk')
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
                mainCharacter.width = 16;
                mainCharacter.playAnimation('walk')
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
                letgridXRight = Math.floor((self.x + MAIN_CHARACTER_WIDTH + (mainCharacter.currentSpeed + currentAccelaration)) / 16);
            } else {
                letgridXLeft = Math.floor((self.x + (mainCharacter.currentSpeed - currentAccelaration)) / 16);
                letgridXRight = Math.floor((self.x + MAIN_CHARACTER_WIDTH + (mainCharacter.currentSpeed - currentAccelaration)) / 16);
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


}