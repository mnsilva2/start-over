let { init, Sprite, GameLoop, initKeys, keyPressed } = kontra

let { canvas } = init();


initKeys();



let loop = GameLoop({
  update: function () {
    renderQueue.background.forEach(element => {
      // element.obj.update();
    });
    renderQueue.sprite.forEach(element => {
      // element.obj.update();
    });
    // renderQueue.main.forEach(element => {

    // });
    if (mainCharacter) {
      if (keyPressed('d') || keyPressed('right')) {
        if (!mainCharacter.isHittingSolid(lvl1).right) {
          mainCharacter.x += 1
        }
      }
      if (keyPressed('a') || keyPressed('left')) {
        if (!mainCharacter.isHittingSolid(lvl1).left) {
          mainCharacter.x -= 1
        }
      }
      if ((keyPressed('w') || keyPressed('up')) && mainCharacter.midAir === 0) {
        mainCharacter.y -= 2
        mainCharacter.midAir++;
      }
      if (mainCharacter.midAir < 8 && mainCharacter.midAir > 0) {
        mainCharacter.y -= 2
        mainCharacter.midAir++;
      }
      if (mainCharacter.midAir == 8 && !mainCharacter.isHittingSolid(lvl1).down) {
        mainCharacter.y += 2
      } else {
        mainCharacter.midAir = 0;
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
    // renderQueue.main.forEach(element => {
    //   element.obj.render();
    // });
    if (mainCharacter) {
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