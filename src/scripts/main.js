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
    if (typeof mainCharacter !== "undefined") {
      let oldX = mainCharacter.x
      let oldY = mainCharacter.y
      if (keyPressed("space") && numOfClones < levels[currentLvl].spawns.length - 1) {
        if (clone.length > 30) {
          createClone(clone);
          clone = []
          numOfClones++;
          mainCharacter.x = levels[currentLvl].spawns[numOfClones].x;
          mainCharacter.x = levels[currentLvl].spawns[numOfClones].y;

        }
      }

      mainCharacter.move();
      let animation = mainCharacter.updateAnimation();
      let turnDirection = mainCharacter.turnDirection;
      mainCharacter.playAnimation(animation)
      if (numOfClones < levels[currentLvl].spawns.length - 1) {
        clone.push({ x: mainCharacter.x, y: mainCharacter.y, animation: animation, turnDirection: turnDirection });
      }

      //end level
      if (mainCharacter.isInEndSpot()) {
        nextLevel();
      }

      mainCharacter.update();
      if (keyPressed("r")) {
        reloadLevel();
      }
    }
  },
  render: function () {
    if (typeof tileEngine !== "undefined") {
      tileEngine.renderLayer("lvl" + (currentLvl + 1));
      renderQueue.sprite.forEach(element => {
        element.obj.render();
      });
    }
    let clones = renderQueue.sprite.length;
    let spawns = levels[currentLvl].spawns.length;

    if (spawns > 1) {
      if (clones < spawns - 1) {
        document.getElementById("clones").innerText = spawns - clones - 1 + " clone" + (spawns - clones - 1 > 1 ? "s" : "") + " left";
      } else {
        document.getElementById("clones").innerText = "No clones left"
      }
    } else {
      document.getElementById("clones").innerText = "";
    }
    if (typeof mainCharacter !== "undefined") {
      mainCharacter.render();
    }
  }
});

loop.start();
window.addEventListener("resize", resize);
window.onload = resize();
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
  renderQueue.sprite = []
  mainCharacter.x = levels[currentLvl].spawns[numOfClones].x * 16;
  mainCharacter.y = levels[currentLvl].spawns[numOfClones].y * 16;
  document.getElementById("hint").innerText = levels[currentLvl].text;
}
function reloadLevel() {
  currentLvl--
  nextLevel();
}

function repeatArray(array, times) {
  merged = array;
  for (let i = 0; i < times; i++) {
    merged = merged.concat(array)
  }
  return merged;
}
let rA = repeatArray;
