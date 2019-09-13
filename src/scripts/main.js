let { init, Sprite, GameLoop, initKeys, keyPressed, SpriteSheet, Animation, TileEngine } = kontra

let { canvas } = init();

initKeys();
let cl = 0;
let mc = undefined;
let cloneArray = [];
let nC = 0;
let loop = GameLoop({
  update: function () {
    if (tileEngine) {
      for (let i = 0; i < lv[cl].doors.length; i++) {
        const door = lv[cl].doors[i];
        let steping = false;
        for (let j = 0; j < rQ.sprite.length; j++) {
          const clone = rQ.sprite[j];
          if (Math.round(clone.x / 16) === door.switch.x && Math.round(clone.y / 16) && door.switch.y) {
            steping = true;
            break;
          }
        }
        if (!steping && mc) {
          if (Math.round(mc.x / 16) === door.switch.x && Math.round(mc.y / 16) && door.switch.y) {
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
          tileEngine.setTileAtLayer("lvl" + (cl + 1), { row: singleDoor.y, col: singleDoor.x }, tile)
        }
      }
    }
    rQ.sprite.forEach(element => {
      element.move();
      element.update();

    });
    if (typeof mc !== "undefined") {
      if (keyPressed("space") && nC < lv[cl].spawns.length - 1) {
        console.log("in", cloneArray)
        if (cloneArray.length > 30) {
          createClone(cloneArray);
          cloneArray = []
          nC++;
          mc.x = lv[cl].spawns[nC].x;
          mc.x = lv[cl].spawns[nC].y;
        }
      }

      mc.move();
      let animation = mc.updateAnimation();
      let td = mc.td;
      mc.playAnimation(animation)
      if (nC < lv[cl].spawns.length - 1) {
        cloneArray.push({ x: mc.x, y: mc.y, animation: animation, td: td });
      }

      //end level
      if (mc.isInEndSpot()) {
        nextLevel();
      }

      mc.update();
      if (keyPressed("r")) {
        reloadLevel();
      }
    }
  },
  render: function () {
    if (typeof tileEngine !== "undefined") {
      tileEngine.renderLayer("lvl" + (cl + 1));
      rQ.sprite.forEach(element => {
        element.render();
      });
    }
    let clones = rQ.sprite.length;
    let spawns = lv[cl].spawns.length;

    if (spawns > 1) {
      if (clones < spawns - 1) {
        $("clones").innerText = spawns - clones - 1 + " clone" + (spawns - clones - 1 > 1 ? "s" : "") + " left";
      } else {
        $("clones").innerText = "No clones left"
      }
    } else {
      $("clones").innerText = "";
    }
    if (typeof mc !== "undefined") {
      mc.render();
    }
  }
});

loop.start();
function resize() {
  let scaleAmountY = Math.floor(window.innerHeight / 192);
  let scaleAmountX = Math.floor(window.innerWidth / 320);

  if (scaleAmountY > scaleAmountX) {
    $("game").style.transform = "scale(" + scaleAmountX + ") translateZ(0)";
    $("c").style.width = (320 * scaleAmountX) + "px"
    $("c").style.height = (192 * scaleAmountX) + "px"
  } else {
    $("game").style.transform = "scale(" + scaleAmountY + ") translateZ(0)";
    $("c").style.width = (320 * scaleAmountY) + "px"
    $("c").style.height = (192 * scaleAmountY) + "px"
  }

}
function nextLevel() {
  cl++;
  cloneArray = [];
  nC = 0;
  rQ.sprite = []
  mc.x = lv[cl].spawns[nC].x * 16;
  mc.y = lv[cl].spawns[nC].y * 16;
  $("hint").innerText = lv[cl].text;
}
function reloadLevel() {
  cl--
  nextLevel();
}

function rA(array, times) {
  merged = array;
  for (let i = 0; i < times; i++) {
    merged = merged.concat(array)
  }
  return merged;
}
function $(id) {
  return document.getElementById(id)
}
