import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width:800,
    height:600,
    background: 0x4472c4
});
document.body.appendChild(app.view as HTMLCanvasElement);
app.ticker.add(update);

function update(){

}
