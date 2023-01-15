import * as PIXI from 'pixi.js';
import { TextStyle, Text } from 'pixi.js';
import { Input } from './Input';
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
    const outputTextContainer = new PIXI.Container();
    const inputTextContainer = new PIXI.Container();
    const buttonContainer = new PIXI.Container();

    //containers positioning
    outputTextContainer.position.set(25, 25);
    inputTextContainer.position.set(25, 525);
    buttonContainer.position.set(625, 525);

    //Areas
    const outputArea = await createPanel(insetTexture, 750, 475);
    const inputArea = await createPanel(insetTexture, 575, 50);

    //buttons
    const hoverButton = await createPanel(hoverTexture, 150, 50);
    const bevelButton = await createPanel(bevelTexture, 150, 50);
    const insetButton = await createPanel(insetTexture, 150, 50);

    //add Events 
    bevelButton.interactive = true;

    bevelButton.on('mouseenter', buttonEnter);
    bevelButton.on('mouseleave', buttonLeave);
    bevelButton.on('pointerdown', buttonDown);
    bevelButton.on('pointerup', buttonUp);

    document.addEventListener('keydown', onKeyDown);

    //button Text
    const text = new Text('Send', style);
    text.anchor.set(0.5, 0.5);
    text.position.set(bevelButton.width / 2, bevelButton.height / 2);

    //creaete input Field
    const inputField = new Input(inputArea);
    const inputFieldData: string[] = [];

    //new Text Element
    const outputText = new Text('', style);
    outputText.position.set(30, 20);
    //append
    outputTextContainer.addChild(outputArea, outputText);
    inputTextContainer.addChild(inputField);
    buttonContainer.addChild(hoverButton, insetButton, bevelButton);
    buttonContainer.addChild(text);

    app.stage.addChild(outputTextContainer, inputTextContainer, buttonContainer);

    function update() {

    }

    function buttonEnter() {
        bevelButton.renderable = false;
        hoverButton.renderable = true;
        insetButton.renderable = false;
    }

    function buttonLeave() {
        bevelButton.renderable = true;
        hoverButton.renderable = false;
        insetButton.renderable = false;
    }

    function buttonDown() {
        bevelButton.renderable = false;
        hoverButton.renderable = false;
        insetButton.renderable = true;
        console.log('clicked');

        inputFieldData.push(inputField.label);
        inputField.label = '';
        console.log(inputFieldData);

        if (outputText.height < outputArea.height - 20) {
            outputText.text = '';
            inputFieldData.forEach(element => {
                outputText.text += element + '\n';
            });
        }
    }

    function buttonUp() {
        hoverButton.renderable = true;
        insetButton.renderable = false;
        bevelButton.renderable = false;
    }

    function onKeyDown(event: KeyboardEvent) {
        if (event.key == 'Backspace' && event.key.length > 0) {
            inputField.label = inputField.label.slice(0, inputField.label.length - 1);
        } else if (event.key == 'Enter') {
            buttonDown();
            setTimeout(buttonUp, 100);
            setTimeout(buttonLeave, 150);
        } else {
            if (inputField.text.width >= inputField.width) {
                inputField.height = inputField.height * 2;
            } else {

                inputField.label += `${event.key}`;
            }
        }
    }
}
