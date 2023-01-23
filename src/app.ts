import * as PIXI from 'pixi.js';
import { TextStyle, Text } from 'pixi.js';
import { Input } from './Input';
import { createPanel, resourceTexture } from './utility';


const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff
})

//Start
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
    const hoverButton = await createPanel(hoverTexture, 150, 50); //orange
    const bevelButton = await createPanel(bevelTexture, 150, 50); //unclicked blue
    const insetButton = await createPanel(insetTexture, 150, 50); //clicked blue

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
    buttonContainer.addChild(hoverButton, insetButton, bevelButton, text);

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

        inputFieldData.push(inputField.label);
        inputField.label = '';

        textPossitioning(outputText, outputArea, inputFieldData);
    }

    function textPossitioning(text: PIXI.Text, container: PIXI.Container, data: string[]) {
        const heightEndPoint = 20;

        if (text.height < container.height - heightEndPoint) {
            text.text = '';
            data.forEach(sentence => {
                text.text += sentence + '\n';
            });
        } else {
            //TODO:
            text.width -= 10;
            text.height -= 10;
        }
    }

    function buttonUp() {
        hoverButton.renderable = true;
        insetButton.renderable = false;
        bevelButton.renderable = false;
    }

    function onKeyDown(event: KeyboardEvent) {
        const widthEndpoint = 60;

        if (event.key == 'Backspace' && event.key.length > 0) {
            inputField.label = inputField.label.slice(0, inputField.label.length - 1);
        } else if (event.key == 'Enter') {
            buttonDown();
            setTimeout(buttonLeave, 100);
        } else {
            if (inputField.text.width >= inputField.width - widthEndpoint) {
                 //TODO:
            } else {
                inputField.label += `${event.key}`;
            }
        }
    }
}
