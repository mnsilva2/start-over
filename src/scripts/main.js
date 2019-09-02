let { init, Sprite, GameLoop, initKeys, keyPressed, SpriteSheet, Animation } = kontra

let { canvas } = init();


initKeys();
let currentLvl = 0;
let mainCharacter = undefined;
let clone = [];
let numOfClones = 0;
let loop = GameLoop({
  update: function () {
    renderQueue.background.forEach(element => {
      // element.obj.update();
    });
    renderQueue.sprite.forEach(element => {
      element.obj.update();
    });
    if (typeof mainCharacter !== undefined) {
      let oldX = mainCharacter.x
      let oldY = mainCharacter.y
      if (keyPressed("r") && numOfClones < levels[currentLvl].spawns.length - 1) {
        if (clone.length > 30) {
          createClone(clone);
          clone = []
          numOfClones++;
          mainCharacter.x = levels[currentLvl].spawns[numOfClones].x;
          mainCharacter.x = levels[currentLvl].spawns[numOfClones].y;

        }
      }

      mainCharacter.move();

      if (numOfClones < levels[currentLvl].spawns.length - 1) {
        clone.push({ x: mainCharacter.x, y: mainCharacter.y });
      }


      //end level
      if (mainCharacter.isInEndSpot()) {
        nextLevel();

      }

      mainCharacter.update();
    }

  },
  render: function () {
    renderQueue.background.forEach(element => {
      element.obj.renderLayer("lvl" + (currentLvl + 1));
      // element.obj.render()
    });
    renderQueue.sprite.forEach(element => {
      element.obj.render();
      element.obj.move();
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
function nextLevel() {
  currentLvl++;
  clone = [];
  numOfClones = 0;
  mainCharacter.x = levels[currentLvl].spawns[numOfClones].x;
  mainCharacter.x = levels[currentLvl].spawns[numOfClones].y;

}