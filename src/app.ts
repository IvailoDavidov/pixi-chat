import * as PIXI from 'pixi.js';
import { TextStyle, Text } from 'pixi.js';
import { createPanel, resourceTexture } from './utility';


const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
})

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

    //Containers positioning
    textOutputContainer.position.set(25, 25);
    textInputContainer.position.set(25, 525);
    buttonContainer.position.set(625, 525);

    //Areas
    const outputArea = await createPanel(insetTexture, 750, 475);
    const inputArea = await createPanel(insetTexture, 575, 50);

    //buttons
    const hoverButton = await createPanel(hoverTexture, 150, 50);
    const bevelButton = await createPanel(bevelTexture, 150, 50);

    //add Events to Buttons
    bevelButton.interactive = true;
    hoverButton.interactive = true;

    bevelButton.on('mouseenter', () => {
        bevelButton.renderable = false;
        hoverButton.renderable = true;
    });

    bevelButton.on('mouseleave', () => {
        bevelButton.renderable = true;
        hoverButton.renderable = false;
    });

    bevelButton.on('pointertap', () => {
        alert('Clicked!');
    });

    //button Text
    let text = new Text('Send', style);
    text.anchor.set(0.5, 0.5);
    text.position.set(bevelButton.width / 2, bevelButton.height / 2);
  
    textOutputContainer.addChild(outputArea);
    textInputContainer.addChild(inputArea);
    buttonContainer.addChild(hoverButton, bevelButton);
    buttonContainer.addChild(text);

    app.stage.addChild(textOutputContainer, textInputContainer, buttonContainer);

    function update() {

    }
}
