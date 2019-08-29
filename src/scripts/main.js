let { init, Sprite, GameLoop, initKeys, keyPressed, SpriteSheet, Animation } = kontra

let { canvas } = init();


initKeys();
let currentLvl = 0;
let mainCharacter;
let clone = [];
let cloneIx = -1;
let backwards = false;
let loop = GameLoop({
  update: function () {
    renderQueue.background.forEach(element => {
      // element.obj.update();
    });
    renderQueue.sprite.forEach(element => {
      // element.obj.update();
    });
    if (typeof mainCharacter !== undefined) {
      let oldX = mainCharacter.x
      let oldY = mainCharacter.y
      if (keyPressed("r") || cloneIx > -1) {
        if (backwards) {
          cloneIx -= 10
          if (cloneIx >= 0) {
            mainCharacter.x = clone[cloneIx].x;
            mainCharacter.y = clone[cloneIx].y;
          } else {
            cloneIx = 0;
            backwards = false;
          }

        }
        cloneIx++;
        if (cloneIx < clone.length - 1) {
          mainCharacter.x = clone[cloneIx].x;
          mainCharacter.y = clone[cloneIx].y;
        } else {
          if (cloneIx < clone.length + 30) {
            backwards = true;
          }
        }
      } else {
        mainCharacter.move();
        clone.push({ x: mainCharacter.x, y: mainCharacter.y });
      }
      if (mainCharacter.x !== oldX) {
        mainCharacter.playAnimation('walk')
      } else {
        mainCharacter.playAnimation('idle')
      }

      mainCharacter.update();
    }

  },
  render: function () {
    renderQueue.background.forEach(element => {
      element.obj.render();
    });
    renderQueue.sprite.forEach(element => {
      element.obj.render();
    });

    if (typeof mainCharacter !== undefined) {
      mainCharacter.render();
    }
  }
});

loop.start();

function resize() {
  let scaleAmountY = Math.floor(window.innerHeight / 192);
  let scaleAmountX = Math.floor(window.innerWidth / 320);

  if (scaleAmountY > scaleAmountX) {
    document.getElementById("game").style.transform = "scale(" + scaleAmountX + ") translateZ(0)";
  } else {
    document.getElementById("game").style.transform = "scale(" + scaleAmountY + ") translateZ(0)";
  }

}