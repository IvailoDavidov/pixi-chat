import { Container, DisplayObject, Text, TextStyle } from 'pixi.js';

const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 22,
    fill: 0x000000,
    align: 'center'
})

export class Input extends Container {

    private text: Text;
    public _label: string = '';

    constructor(private element: DisplayObject) {
        super();

        this.text = new Text('', style);
        this.text.anchor.set(0.2, 0.1);
        this.addChild(this.element);
        this.addChild(this.text);
    }
    get label() {
        return this._label;
    }

    set label(value: string) {

        this._label = value;
        this.text.text = value;
        this.text.position.set(this.text.width / 2, this.text.height / 2)
    }
}