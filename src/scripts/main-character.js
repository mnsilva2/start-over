const walls = [1, 3, 4, 20, 17, 19,]
const bg = [0, 11, 12, 13, 14, 15, 16, 27, 28, 29, 30, 31, 32]

const MAX_SPEED = 1.3;
const ACCELARATION = 0.1
const DRAG = 0.8
const MAX_HEIGHT_JUMP = 20;
const MIN_HEIGHT_JUMP = 10;
const MAIN_CHARACTER_WIDTH = 16;
let image = new Image();
// image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAgCAMAAADt/IAXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAkkGQonHA0nGw0oHA8sHxAmHhMsHwcmLwssIwwpIAwvIg8oLwUpMwgpMgsrNAsuNw8vNwgvOQ0wIg0yJA41Jg83KA84KAk0Pw0wOg00PxAvIRAoLxkvJBItNRA4KRM/LhQ6Kh06KhAxOhczOx42PSAyJCQzKyY7Ki4zKik/LSA3OTU5MAk1QA02Qg44QQ05RBM2QBI4QBI7RRI8RRQ4QhQ6RBI9SBU8SBk9Rh89Rhk/SCE8QBRBMB5AMiBHPSNPPCVJPDVALjJDMDJHNj5BMQ9CThxBSyNASCFCTCBFTyRDTCRGTydPQSpBSCFGUCNIUipIUilMVSxNVilOWS1OWC1VXzFHUjBOVj9PWzVRWTpWXj9YXzJZYzVeaDlZYkQrG1M2I1E3JlI9MUNBPUZJNUdNOldCOFJMN2RGMWlLNWxNNnBTPUVLTUdPSEVaSUxTVE1VWExZVFdVQlpaR0BdZlFjUlNkU15mU19jWkVhaUpgZkVqc0ppcUltdlJla1Rob1xkbFBvd1xqclN3alp7blFze1F1fldxeFpwdl1xdl50emFSSG5XSWhZRm5bSHJcTXZeSH1cQn5dRH5fSGxoXnFgSnNgTnlhTH1kT3VgVHdnXXdoXXpnXH1qVHpqXn1pXGJpY2V1aWV7bGp1b2JweGZ5fmtxeW95dWl6f3JqYHZuZnp9a3F2fVh5gl15gGR6gW1+g3F+gnZ/hn6Hdn+EfWyGjnWChnmCiXuJjHOKkXCOlXWKknaOlXyNkn6QlHyRmIBfR4JjS4VmTIRmUIdpUYttVIVxWoZwX4tyWoJwZoRyZol2YY94Z417bI18cpF7a5B/dZuCbJuEb5yCbJeCcZKHe5SEeZKNe5yEcKONfIqLh4GOkoGRlYKVm46UmpKPjJuRiZySiJ6VjJGUmp+Xko2kmZCjl6eXjKiUhKmXia6Zha+diaqakKqckquelbCah7CbiLOciLOfjbOhkrSikLGjmLGqnLupmbuqnb+tnMCunsSzpAAAAAAAAAAAAKBUVM0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACy0lEQVRYR+2SZVAVURiGxe5CVOxuRRRsbEVxVEQsULEVuzBQLGxM7G6wAQNFFLtbsQO7sVtnPs8537tX7v2xyw9n/HOfmfud592d3X3v2U1C/xlrAWsBawFrAWsBawEUeLGaVw2j/O9AgVu9e7IAo6zLmcuQxIACscE3WIB+PosVzFkKAX07Q8DMFRBwEasCBb7O/cYCdPM1364wxvKBxw9DQJ8uEODbCSLRPsL6tSFAL98OPg9j5h+FgFeLtz6DKuadgIAjxyASrYBdqZswRjefWvkcpohfNGLdG7hid6pCJ3/BBfGzhw2/CpdcWrILJtAK2NaNhTH6uZjdkNdQyfrkNc9BFXdsCtB3uGRNsjqUoBCNzN3DdLlpB+pdgTH6OaXd2vdQhY1LggKff1womX8SgmKzjQvRRwTBxqQFF0K1AtfTNvjCxjyyyI/N8+BsAz5BJe/KlDgNBbZNIYqH/XNMhDLFsw+FaQVWpZ/xm41Zlsc8LzfPW1J0/wAVvCTKOwsOHJwgIE0tiOLtgnS9fsJRYFCGfixgoEW2OP+0RukHUKZiUYhidHl7eyhwcoCACt0gWoGq7SuzAKPcMNdBmGRMuYxFoJIq04kywZnWWbPAmCk5G8FQIMyfPJUAgxztkHoHVOLhR6HV4BIP8fMKY1e4jYoqDFUEZM4H0wq0JfJXAgxyJedmMIV/JJEjXOIjR3WlCp9wcYd9CIIgt3xjoVqBINFXXQYMcqBjDIxpSdQEKpkqR4S3Z7RK6jTddezQcfuBOD7gWrb5hMj97PgGAoi82RiD7OwOYcSpPe6TESj8PmRaq71q9VJTEDEeq2sMRYVsU44CfkQxYiNNGORNjeW/MnFPvvAQ7Stph1UQKke4+XZJxCvVQAG5v+IhJoxyG/I+BJUEqtlCTUviEjxNYxz2X8AFQjeIwXdRGOUn4tBO+F94TxOD2hkJ0R+Zehpg7apipgAAAABJRU5ErkJggg=="
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