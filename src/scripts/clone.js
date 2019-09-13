function createClone(positions) {
    addToRenderQueue(Sprite({
        x: positions[0].x,
        y: positions[0].y,
        width: 16,
        height: 32,
        positions: positions,
        currentPosition: 0,
        goingBackwards: false,
        animations: spriteSheet.animations,
        move: function () {
            if (!this.goingBackwards) {
                if (this.currentPosition >= this.positions.length + 30) {
                    this.goingBackwards = true;
                    this.currentPosition = this.positions.length - 1;
                } else {
                    if (this.currentPosition < this.positions.length) {
                        this.x = this.positions[this.currentPosition].x;
                        this.y = this.positions[this.currentPosition].y;
                        this.playAnimation(this.positions[this.currentPosition].animation);
                        if (this.positions[this.currentPosition].td == 1) {
                            this.width = 16;
                        } else {
                            this.width = -16;
                        }
                    }
                    this.currentPosition++;

                }
            } else {

                if (this.currentPosition <= 0) {
                    this.goingBackwards = false;
                    this.currentPosition = 0;
                } else {
                    this.x = this.positions[this.currentPosition].x;
                    this.y = this.positions[this.currentPosition].y;
                    this.playAnimation("recall");
                    this.currentPosition -= 10;
                }
            }
        }
    }))
}