let renderQueue = {
    main: [],
    background: [],
    sprite: []
};

const RENDER_QUEUE_TYPES = {
    SPRITE: 0,
    MAIN: 1,
    BACKGROUND: 2
}

function addToRenderQueue(obj) {
    renderQueue.sprite.push({ obj })
}
