const walls = [1, 3, 4, 20, 17, 19,]
const bg = [0, 11, 12, 13, 14, 15, 16, 27, 28, 29, 30, 31, 32]

const MAX_SPEED = 1.3;
const ACCELARATION = 0.1
const DRAG = 0.8
const MAX_HEIGHT_JUMP = 20;
const MIN_HEIGHT_JUMP = 10;
const MAIN_CHARACTER_WIDTH = 16;
let image = new Image();
// image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAgCAMAAADt/IAXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAkkGQonHA0nGw0oHA4sHxAmHhMsHwcmLwssIwwpIAwvIgUpMwssNQgvOQ0wIg0yJA41Jg83KA84KAwyPBAvIRAoLxkvJBItNRE5KhM/LhQ6Kh8zJR06KhMyOh42PSQzKyY7Ki4zKig/LSA2OTU5MAs1QQ44QQ05RBM2QBI4QBI7RRI8RRQ4QhQ6RBI8SBo9Rhk/SCE8QBRBMB5AMi5CLyBHPSBNOSNPPCVJPCRQPTRALjJDMDFEMTJHNjJLOj5BMTxFMg9CThxBSyJDTCdPQSpBSCFGUCNIUipLVSpOWC1VXzFHUjBOVj9PWzVRWTpWXj9YXzJZYzVeaDlZYkQrG0w2KlM2I1E3JlM9MUFGMURCMkNBPUdKNUdNOklHMldCOFJMN2NELmVHMWZKNWtMNmxNNnBTPUVLTUdPSE5OTUdaSUxTVE1VWFNPTVBTQVpaR1BcV0BdZlFjUlNkU15mU19jWkVhaUpgZkVqc0pqclJla1Rob1xkbFBvd1xqclN3alp7blNze1twdl50emFSSGVUSGdWTG5XSWhZRm5bSHZcRXJcTXZeSH5dQn5dRH5fSGxoXnFgSnNgTnlhTHhkTn1kT3VgVHZlUHdnW3dnXXdoXXpnXH1oXGJpY2N1aWV7bGp1b2JweGZ5fmtxeW95dWl6f3JqYHZuZnp9a3F2fV15gGR6gW1+g3N+g36Hdn+EfWyGjnWChnmCiXuJjHOMk3yNkn6QlHyRmIBfR4JhRYJjS4VmTIRmUIdpUYttVIVxWotyWoJuYoNwY4JwZohyYYl2YY94Zo17bI18cpB3ZJZ5Y5F7a5B/dYyHdZuCbpuEb5yCbJGAdJSEeZaKf5+FcJ6KeaCMfaiPeoqLh4GOkoGRlYKVm46UmpOPjJuRiJySiJGUmp+Xko2kmZSjl6GQhKeXi6SWjaCbi6GdjamVhayVgqmXia6ah6+diaycj6qakKqckquelbCbiLKdiaullrOhkrGil7SikLGqnLupmbuqnb6snMCunsSzpAAAAOvAaWAAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAADDklEQVRYR+3TVVQUURzHcbFFYB1dEQxsEIEDih0YrAoYoGKBHZgYGCgGCtiI3S2YgIoCdncidiF2YGG31xu/WWd5GR48x5f9nMPM9+4eZv57dzYH+c+MAxgHMA5gHMA4gHEADPDkqDjLnq5EQGYk4p/DAGd7ThUBKX26o4TrAZ1Q2XD8AiI7MMC5qGci4FrUFZSQuvcyijmGM0QuRkDfDgiYtgIBZ3DmMMDbmeIs+zLrGwoWfkJQN3q3RwlZb3hwDwICOiKgVzsEIz+EbnUQ4FYLAQ1qIqiMqFMoYc5+BLxasPkRkpt9CAH7DiAYeQCp/guUIFV/jhKk8hdR1Iklj1Fc5vyRa96gue35Sh3+haYyZwwfcQnNnF+0DUXJA2i6fUQJGr+XKEFTNxXFlJSG3EQya3NXO4nkbpkUJ9/RzKpctYliIDKqaNfXSP0A1n6GA0iNDAeQ6qWgmLzSav0VGBNXxQCff5wuZz0JC26jiSshiuuvz1liHlIe4Kqp/09Rwn1Tf+VHIOmmDb8imWGFBirnfV+x7BEkaJoguPT+RSYihTKFh6LkAZZaThEBy7Ksl1tO/o1kNuXp8gFJZRBSbDoa7BwRUKAGgns3t2AP+fNigECzwSJgkNkAlBBo1g/FPaxa4R5ScCiN4MZU0mqR4GiHgMqdEfIALq2dRYDaurF2F4oJsTW3QTLO4YSYo4XmFobrMK0OhQFig4kXD1BZJ9nl34pkPINIjAua8aR/3rGiOd3oROWAJMTCCiUP0JKQYB6gsnZwaorighMIsUczvuxQhSfnG0evkIQFFaGzGouUB4ig8/J/A5V1qH0ySqC7o99SKowd4n285HuyHblt06ZtbFKaeMHdttmEBLyLZyCEEB9RgsrayQMh0Ld2ePDbMnF3EeFeO/nZmx+p+PE4uyeTxOgtvDFAECHJdCP1VNYbdOxT6d1hX3i0/JS0wpmKYYc4w+1i6FcqwwBsf+lN9NTWLYjPbiQTyo8GQ+mlKe4mG/f3iRADxKyjB3EVTm39gL6k/B0IYk+zg+8MQ8gfajcUNHhr7KgAAAAASUVORK5CYII="
image.src = "data:image/png;base64,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"

image.onload = function () {
    let spriteSheet = SpriteSheet({
        image: image,
        frameWidth: 16,
        frameHeight: 32,
        animations: {
            walk: {
                frames: [3].concat(repeatArray([3, 4, 5, 6, 7], 10)),  // frames 0 through 9
                frameRate: 10,
                loop: true

            },
            idle: {
                frames: [0, 0, 0, 1, 2, 2, 2, 1],  // frames 0 through 9
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