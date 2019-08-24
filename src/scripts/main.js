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
        mainCharacter.x += 1
      }
      if (keyPressed('a') || keyPressed('left')) {
        mainCharacter.x -= 1
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