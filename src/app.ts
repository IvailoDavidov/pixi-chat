import * as PIXI from 'pixi.js';
import { createPanel, resourceTexture } from './utility';

init();

async function init() {

    const app = new PIXI.Application({
        width: 800,
        height: 600,
        background: 0x4472c4
    });

    document.body.appendChild(app.view as HTMLCanvasElement);
    app.ticker.add(update);

    //textures
    const hoverTexture = await resourceTexture('assets/hover.png', 25, 105, 25, 105);
    const bevelTexture = await resourceTexture('assets/bevel.png', 25, 105, 25, 105);
    const insetTexture = await resourceTexture('assets/inset.png', 25, 105, 25, 105);

    //containers
    const textOutputContainer = new PIXI.Container();
    const textInputContainer = new PIXI.Container();
    const buttonContainer = new PIXI.Container();

    //Areas
    const outputArea = await createPanel(insetTexture, 750, 475);
    const inputArea = await createPanel(hoverTexture, 575, 50);

    //buttons
    const orangeButton = await createPanel(hoverTexture, 150, 50);
    const blueButton = await createPanel(bevelTexture, 150, 50);

    //positioning
    textOutputContainer.position.set(25,25);
    textInputContainer.position.set(25,525);
    buttonContainer.position.set(625,525);

    textOutputContainer.addChild(outputArea);
    textInputContainer.addChild(inputArea);
    buttonContainer.addChild(orangeButton,blueButton);

    app.stage.addChild(textOutputContainer,textInputContainer,buttonContainer);

    function update() {

    }
}
