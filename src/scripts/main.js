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
      if (!mainCharacter.isJumping && !mainCharacter.isFalling) {
        if (keyPressed('w') || keyPressed('up')) {
          mainCharacter.isJumping = true;
          mainCharacter.jumpIndex = 20
        }
        if (!mainCharacter.isHittingSolid(lvl1).down) {
          mainCharacter.isFalling = true;
          mainCharacter.jumpIndex = 0;
        }
      } else {
        //jumping logic
        if (mainCharacter.jumpIndex >= -20) {
          if (mainCharacter.jumpIndex > 0) {
            mainCharacter.y -= (mainCharacter.jumpIndex ** 2) * 0.01
          } else {
            mainCharacter.y += (mainCharacter.jumpIndex ** 2) * 0.01
            mainCharacter.isFalling = true;
          }
          mainCharacter.jumpIndex--;
          if (mainCharacter.isHittingSolid(lvl1).down) {
            mainCharacter.jumpIndex = -21
          }
        } else {
          mainCharacter.isJumping = false;
          // mainCharacter.jumpIndex = 20
        }
      }
      if (mainCharacter.isFalling) {
        mainCharacter.y += (mainCharacter.jumpIndex ** 2) * 0.01
        mainCharacter.jumpIndex--;
        if (mainCharacter.isHittingSolid(lvl1).down) {
          mainCharacter.isFalling = false;
          mainCharacter.alignDown();
        }
      }

      // if ((keyPressed('w') || keyPressed('up')) && !mainCharacter.isJumping && !mainCharacter.isFalling) {
      //   mainCharacter.y -= mainCharacter.jumpArc();
      //   mainCharacter.isJumping = true;
      // }
      // if (mainCharacter.isJumping) {
      //   mainCharacter.y -= mainCharacter.jumpArc();
      //   if (mainCharacter.isHittingSolid(lvl1).down) {
      //     mainCharacter.isJumping = false;
      //     mainCharacter.jumpIndex = 0;
      //   }
      // } else {
      //   if (!mainCharacter.isHittingSolid(lvl1).down) {
      //     mainCharacter.y += 1
      //     mainCharacter.isFalling = true;
      //   } else {
      //     if (mainCharacter.isFalling) {
      //       mainCharacter.isFalling = false;
      //     }
      //   }
      // }

      // if (mainCharacter.isHittingSolid(lvl1).down && mainCharacter.isFalling) {
      // }


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