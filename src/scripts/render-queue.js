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

function addToRenderQueue(obj, type, data) {
    switch (type) {
        case RENDER_QUEUE_TYPES.SPRITE:
            renderQueue.sprite.push({ obj, data })
            break;
        case RENDER_QUEUE_TYPES.BACKGROUND:
            renderQueue.background.push({ obj, data })
            break;
        case RENDER_QUEUE_TYPES.MAIN:
            renderQueue.MAIN.push({ obj, data })
            break;
    }
}
