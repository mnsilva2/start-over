const walls = [1, 3, 4, 20, 17, 19,]
const bg = [0, 11, 12, 13, 14, 15, 16, 27, 28, 29, 30, 31, 32]

const MAX_SPEED = 1.3;
const ACCELARATION = 0.1
const DRAG = 0.8
const MAX_HEIGHT_JUMP = 20;
const MIN_HEIGHT_JUMP = 10;
const MAIN_CHARACTER_WIDTH = 16;
let image = new Image();
image.src = "./animations.png"


image.onload = function () {
    let spriteSheet = SpriteSheet({
        image: image,
        frameWidth: 16,
        frameHeight: 32,
        animations: {
            run: {
                frames: [2].concat(repeatArray([3, 4, 5, 6, 7], 10)),
                frameRate: 15,
                loop: true

            },
            idle: {
                frames: [0, 0, 1],
                frameRate: 1,
                loop: true
            },
            turn: {
                frames: [8],
                frameRate: 1,
                loop: true
            },
            standJump: {
                frames: [9],
                frameRate: 1,
                loop: true
            },
            standFall: {
                frames: [10],
                frameRate: 1,
                loop: true
            },
            runJump: {
                frames: [11],
                frameRate: 1,
                loop: true
            },
            standWall: {
                frames: [12],
                frameRate: 1,
                loop: true
            },
            jumpWall: {
                frames: [13],
                frameRate: 1,
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
        turnDirection: 0, //0 Right 1 Left

        move: () => {
            if (keyPressed('d') || keyPressed('right')) {
                mainCharacter.width = -16;
                mainCharacter.turnDirection = 0;
                let oldX = mainCharacter.x;
                mainCharacter.x += mainCharacter.currentSpeed;

                if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).right) {
                    mainCharacter.currentSpeed = mainCharacter.currentSpeed / 2;
                    mainCharacter.x = oldX;

                } else {
                    let changeDirectionModifier = 1
                    if (mainCharacter.currentSpeed < 0) {
                        changeDirectionModifier = 1.5
                    }
                    if (mainCharacter.currentSpeed < MAX_SPEED) {
                        mainCharacter.currentSpeed = mainCharacter.currentSpeed + ACCELARATION * changeDirectionModifier;
                    }
                }
            }
            if (keyPressed('a') || keyPressed('left')) {
                mainCharacter.width = 16;
                mainCharacter.turnDirection = 1;
                let oldX = mainCharacter.x;
                mainCharacter.x += mainCharacter.currentSpeed;

                if (mainCharacter.isHittingSolid(levels[currentLvl].lvl).left) {
                    mainCharacter.currentSpeed = mainCharacter.currentSpeed / 2;
                    mainCharacter.x = oldX;


                } else {
                    let changeDirectionModifier = 1
                    if (mainCharacter.currentSpeed > 0) {
                        changeDirectionModifier = 1.5
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
        updateAnimation: () => {
            let hitting = mainCharacter.isHittingSolid(levels[currentLvl].lvl, true)
            if (keyPressed('a') || keyPressed('left') || keyPressed('d') || keyPressed('right')) {
                if (mainCharacter.isJumping || mainCharacter.isFalling) {
                    mainCharacter.playAnimation("runJump");
                } else {
                    if ((mainCharacter.turnDirection === 0 && mainCharacter.currentSpeed < -0.1) ||
                        (mainCharacter.turnDirection === 1 && mainCharacter.currentSpeed > 0.1)) {
                        mainCharacter.playAnimation("turn");
                    } else {
                        mainCharacter.playAnimation("run");
                    }
                }
            } else {
                if ((hitting.left && mainCharacter.turnDirection === 1) ||
                    hitting.right && mainCharacter.turnDirection === 0) {
                    if (mainCharacter.isJumping || mainCharacter.isFalling) {
                        mainCharacter.playAnimation("jumpWall");
                    } else {
                        mainCharacter.playAnimation("standWall");

                    }
                } else {
                    if (mainCharacter.isJumping) {
                        mainCharacter.playAnimation("standJump");
                    } else {
                        if (mainCharacter.isFalling) {
                            mainCharacter.playAnimation("standFall");
                        } else {
                            mainCharacter.playAnimation("idle");
                        }
                    }
                }
            }
        },
        isHittingSolid: (lvl, extraSpace) => {
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
            let extra = 0
            if (extraSpace) {
                extra = 2
            }
            if (mainCharacter.currentSpeed > 0) {
                letgridXLeft = Math.floor((self.x - extra + (mainCharacter.currentSpeed + currentAccelaration)) / 16);
                letgridXRight = Math.floor((self.x + extra + MAIN_CHARACTER_WIDTH + (mainCharacter.currentSpeed + currentAccelaration)) / 16);
            } else {
                letgridXLeft = Math.floor((self.x - extra + (mainCharacter.currentSpeed - currentAccelaration)) / 16);
                letgridXRight = Math.floor((self.x + extra + MAIN_CHARACTER_WIDTH + (mainCharacter.currentSpeed - currentAccelaration)) / 16);
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