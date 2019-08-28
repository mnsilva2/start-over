let { init, Sprite, GameLoop, initKeys, keyPressed } = kontra

let { canvas } = init();


initKeys();

let mainCharacter;

let loop = GameLoop({
  update: function () {
    renderQueue.background.forEach(element => {
      // element.obj.update();
    });
    renderQueue.sprite.forEach(element => {
      // element.obj.update();
    });
    if (typeof mainCharacter !== undefined) {
      mainCharacter.move();
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