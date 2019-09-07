let { init, Sprite, GameLoop, initKeys, keyPressed, SpriteSheet, Animation, TileEngine } = kontra

let { canvas } = init();

initKeys();
let currentLvl = 0;
let mainCharacter = undefined;
let clone = [];
let numOfClones = 0;
let loop = GameLoop({
  update: function () {
    if (tileEngine) {
      for (let i = 0; i < levels[currentLvl].doors.length; i++) {
        const door = levels[currentLvl].doors[i];
        let steping = false;
        for (let j = 0; j < renderQueue.sprite.length; j++) {
          const clone = renderQueue.sprite[i];
          if (Math.round(clone.obj.x / 16) === door.switch.x && Math.round(clone.obj.y / 16) && door.switch.y) {
            steping = true;
            break;
          }
        }
        if (!steping && mainCharacter) {
          if (Math.round(mainCharacter.x / 16) === door.switch.x && Math.round(mainCharacter.y / 16) && door.switch.y) {
            steping = true;
          }
        }
        for (let j = 0; j < door.doors.length; j++) {
          const singleDoor = door.doors[j];
          let tile = singleDoor.tileOn;
          if (steping) {
            tile = singleDoor.tileOn
          } else {
            tile = singleDoor.tileOff
          }
          tileEngine.setTileAtLayer("lvl" + (currentLvl + 1), { row: singleDoor.y, col: singleDoor.x }, tile)
        }
      }
    }
    renderQueue.sprite.forEach(element => {
      element.obj.move();
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
    if (tileEngine) {
      tileEngine.renderLayer("lvl" + (currentLvl + 1));

      renderQueue.sprite.forEach(element => {
        element.obj.render();
      });
    }
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
    document.getElementById("container").style.width = (320 * scaleAmountX) + "px"
    document.getElementById("container").style.height = (192 * scaleAmountX) + "px"
  } else {
    document.getElementById("game").style.transform = "scale(" + scaleAmountY + ") translateZ(0)";
    document.getElementById("container").style.width = (320 * scaleAmountY) + "px"
    document.getElementById("container").style.height = (192 * scaleAmountY) + "px"
  }

}
function nextLevel() {
  currentLvl++;
  clone = [];
  numOfClones = 0;
  mainCharacter.x = levels[currentLvl].spawns[numOfClones].x;
  mainCharacter.x = levels[currentLvl].spawns[numOfClones].y;
  document.getElementById("hint").innerText = levels[currentLvl].text;

}