import * as PIXI from 'pixi.js';
import { resourceTexture } from './utility';

init();

async function init() {

    const app = new PIXI.Application({
        width: 800,
        height: 600,
        background: 0x4472c4
    });

    document.body.appendChild(app.view as HTMLCanvasElement);
    app.ticker.add(update);

    const hoverTexture = await resourceTexture('assets/hover.png',25,105,25,105);
    const bevelTexture = await resourceTexture('assets/bevel.png',25,105,25,105);
    const insetTexture = await resourceTexture('assets/inset.png',25,105,25,105);
  
    function update() {

    }
}
