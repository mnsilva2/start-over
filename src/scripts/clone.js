function createClone(positions) {
    addToRenderQueue(Sprite({
        x: positions[0].x,
        y: positions[0].y,
        color: 'red',
        width: 16,
        height: 32,
        positions: positions,
        currentPosition: 0,
        goingBackwards: false,
        move: function () {
            if (!this.goingBackwards) {
                if (this.currentPosition >= this.positions.length + 30) {
                    this.goingBackwards = true;
                    this.currentPosition = this.positions.length - 1;
                } else {
                    if (this.currentPosition < this.positions.length) {
                        this.x = this.positions[this.currentPosition].x;
                        this.y = this.positions[this.currentPosition].y;
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
                    this.currentPosition -= 10;
                }
            }
        }
    }), RENDER_QUEUE_TYPES.SPRITE, null)
}