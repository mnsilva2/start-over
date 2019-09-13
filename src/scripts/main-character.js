const walls = [1, 3, 4, 6, 8, 9,]
const bg = [0, 10, 11, 12, 13, 14, 15]

let image = new Image();
image.src = "./animations.png"
let spriteSheet;
let kp = keyPressed
image.onload = function () {
    spriteSheet = SpriteSheet({
        image: image,
        frameWidth: 16,
        frameHeight: 32,
        animations: {
            run: {
                frames: [2].concat(rA([3, 4, 5, 6, 7], 10)),
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
            runFall: {
                frames: [12],
                frameRate: 1,
                loop: true
            },
            standWall: {
                frames: [13],
                frameRate: 1,
                loop: true
            },
            jumpWall: {
                frames: [14],
                frameRate: 1,
                loop: true
            },
            recall: {
                frames: [9],
                frameRate: 1,
                loop: true
            }
        }
    })


    mc = Sprite({
        x: lv[cl].spawns[0].x * 16,
        y: lv[cl].spawns[0].y * 16,
        width: 16,
        height: 32,
        animations: spriteSheet.animations,
        iJ: false,
        iFa: true,
        ji: 0,
        cs: 0,
        td: 0, //0 Right 1 Left
        sIA: false,

        move: () => {
            if (keyPressed('d') || keyPressed('right')) {
                mc.width = -16;
                mc.td = 0;
                let oldX = mc.x;
                mc.x += mc.cs;

                if (mc.ihs(lv[cl].lvl).right) {
                    mc.cs = mc.cs / 2;
                    mc.x = oldX;

                } else {
                    let changeDirectionModifier = 1
                    if (mc.cs < 0) {
                        changeDirectionModifier = 1.5
                    }
                    if (mc.cs < 1.3) {
                        mc.cs = mc.cs + 0.1 * changeDirectionModifier;
                    }
                }
            }
            if (keyPressed('a') || keyPressed('left')) {
                mc.width = 16;
                mc.td = 1;
                let oldX = mc.x;
                mc.x += mc.cs;

                if (mc.ihs(lv[cl].lvl).left) {
                    mc.cs = mc.cs / 2;
                    mc.x = oldX;


                } else {
                    let changeDirectionModifier = 1
                    if (mc.cs > 0) {
                        changeDirectionModifier = 1.5
                    }
                    if (mc.cs > -1.3) {
                        mc.cs = mc.cs - 0.1 * changeDirectionModifier;
                    }
                }
            }
            if (mc.ihs(lv[cl].lvl).left) {
                mc.alignLeft();
            }
            if (mc.ihs(lv[cl].lvl).right) {
                mc.alignRight();
            }

            if (mc.cs < 0.1 && mc.cs > -0.1) {
                mc.cs = 0
            }
            if (!keyPressed('a') && !keyPressed('left') && !keyPressed('d') && !keyPressed('right')) {
                let oldX = mc.x;
                if (mc.cs < 0.1 && mc.cs > -0.1) {
                    mc.cs = 0
                    mc.centerPixel()
                } else {
                    mc.cs = mc.cs * 0.8
                    mc.x += mc.cs;
                }
                if (mc.ihs(lv[cl].lvl).left || mc.ihs(lv[cl].lvl).right) {
                    mc.x = oldX;
                }
            }
            if (mc.iFa) {
                mc.y += (mc.ji ** 2) * 0.01
                mc.sIA = true;
                if (mc.ji > -30) {
                    mc.ji--;
                }
                if (mc.ihs(lv[cl].lvl).down) {
                    mc.iFa = false;
                    mc.alignDown();
                }
            } else {
                if (mc.iJ) {
                    mc.sIA = true;
                    mc.y -= (mc.ji ** 2) * 0.01
                    if ((keyPressed('w') || keyPressed('up')) && mc.ji > 10) {
                        mc.ji -= .75;
                    } else {
                        mc.ji -= 5;

                    }

                    if (mc.ji <= 0) {
                        mc.iFa = true;
                        mc.iJ = false;
                    }
                } else {
                    if ((keyPressed('w') || keyPressed('up')) && !(mc.sIA)) {
                        mc.iJ = true;
                        mc.ji = 20
                        mc.sIA = true
                    }
                    if (!mc.ihs(lv[cl].lvl).down) {
                        mc.iFa = true;
                        mc.ji = 0;
                    }
                    if (!keyPressed('w') && !keyPressed('up')) {
                        mc.sIA = false;
                    }
                }
            }
        },
        updateAnimation: () => {
            let hitting = mc.ihs(lv[cl].lvl, true)
            if ((hitting.left && mc.td === 1) ||
                hitting.right && mc.td === 0) {
                if (mc.iJ || mc.iFa) {
                    return ("jumpWall");
                } else {
                    return ("standWall");

                }
            } else {
                if (keyPressed('a') || keyPressed('left') || keyPressed('d') || keyPressed('right')) {
                    if (mc.iJ) {
                        return "runJump";

                    } else {
                        if (mc.iFa) {
                            return "runFall";
                        } else {
                            if ((mc.td === 0 && mc.cs < -0.1) ||
                                (mc.td === 1 && mc.cs > 0.1)) {
                                return ("turn");
                            } else {
                                return ("run");
                            }
                        }
                    }
                } else {

                    if (mc.iJ) {
                        return ("standJump");
                    } else {
                        if (mc.iFa) {
                            return ("standFall");
                        } else {
                            return ("idle");
                        }
                    }
                }
            }
        },
        ihs: (lvl, extraSpace) => {
            let letgridXLeft, letgridXRight, currentAccelaration = 0;
            let hitting = {
                left: false,
                right: false,
                down: false
            }
            let self = mc;
            if (mc.cs !== 0) {
                currentAccelaration = 0.1;
            }
            let extra = 0
            if (extraSpace) {
                extra = 2
            }
            if (mc.cs > 0) {
                letgridXLeft = Math.floor((self.x - extra + (mc.cs + currentAccelaration)) / 16);
                letgridXRight = Math.floor((self.x + extra + 16 + (mc.cs + currentAccelaration)) / 16);
            } else {
                letgridXLeft = Math.floor((self.x + 1 - extra + (mc.cs - currentAccelaration)) / 16);
                letgridXRight = Math.floor((self.x + extra + 16 + (mc.cs - currentAccelaration)) / 16);
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
            let self = mc;
            self.y = Math.round(self.y / 16) * 16;
        },
        alignLeft: () => {
            let self = mc;
            self.x = (Math.round(self.x / 16) * 16);
        },
        alignRight: () => {
            let self = mc;
            // self.x = (Math.round(self.x / 16) * 16);
        },
        centerPixel: () => {
            let self = mc;
            self.x = Math.round(self.x);
        },
        isInEndSpot: function () {
            return (Math.round(this.x / 16) === lv[cl].end.x && Math.round(this.y / 16) === lv[cl].end.y)


        }
    });
}