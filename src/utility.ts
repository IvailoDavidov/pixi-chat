import * as PIXI from 'pixi.js';

export type resourceParts = [
    [PIXI.Texture, PIXI.Texture, PIXI.Texture],
    [PIXI.Texture, PIXI.Texture, PIXI.Texture],
    [PIXI.Texture, PIXI.Texture, PIXI.Texture]
]

export async function resourceTexture(url: string, left: number, right: number, top: number, bottom: number): Promise<resourceParts> {

    const resourceBT = PIXI.BaseTexture.from(url);

    await new Promise((resolve, reject) => {
        resourceBT.on('loaded', resolve);
        resourceBT.on('error', reject);
    });

    //horizontal
    const lw = left;
    const cw = right - left;
    const rw = resourceBT.width - right;

    //vertical 
    const th = top;
    const ch = bottom - top;
    const bh = resourceBT.height - bottom;

    return [
        [
            slice(resourceBT, 0, 0, lw, th),           
            slice(resourceBT, left, 0, cw, th),       
            slice(resourceBT, right, 0, rw, th)        
        ],
        [
            slice(resourceBT, 0, top, lw, ch),
            slice(resourceBT, left, top, cw, ch),
            slice(resourceBT, right, top, rw, ch)
        ],
        [
            slice(resourceBT, 0, bottom, lw, bh),
            slice(resourceBT, left, bottom, cw, bh),
            slice(resourceBT, right, bottom, rw, bh)
        ]
    ]
}

export async function createPanel(resourceParts: resourceParts, width: number, height: number) {

    const resourceCointainer = new PIXI.Container();

    const tl = new PIXI.Sprite(resourceParts[0][0]);
    const tr = new PIXI.Sprite(resourceParts[0][2]);
    const bl = new PIXI.Sprite(resourceParts[2][0]);
    const br = new PIXI.Sprite(resourceParts[2][2]);

    resourceCointainer.addChild(tl, tr, bl, br);

    const t = new PIXI.Sprite(resourceParts[0][1]);
    const b = new PIXI.Sprite(resourceParts[2][1]);

    const l = new PIXI.Sprite(resourceParts[1][0]);
    const r = new PIXI.Sprite(resourceParts[1][2]);

    const c = new PIXI.Sprite(resourceParts[1][1]);

    if (width < tl.width + tr.width) {
        const half = width / 2;
        tl.width = half;
        tr.width = half;
        bl.width = half;
        br.width = half;
        l.width = half;
        r.width = half;
    }
    if (height < tl.height + bl.height) {
        const half = height / 2;
        tl.height = half;
        tr.height = half;
        bl.height = half;
        br.height = half;
        t.height = half;
        b.height = half;
    }

    tl.position.set(0, 0);
    tr.position.set(width - tr.width, 0);
    bl.position.set(0, height - bl.height);
    br.position.set(width - br.width, height - br.height);

    if (width > tl.width + tr.width) {
        t.width = width - (tl.width + tr.width);
        b.width = width - (bl.width + br.width);
        t.position.set(tl.width, 0);
        b.position.set(bl.width, height - b.height);

        resourceCointainer.addChild(t, b);
    }
    if (height > tl.height + bl.height) {

        l.height = height - (tl.height + bl.height);
        r.height = height - (tr.height + br.height);
        l.position.set(0, tl.height);
        r.position.set(width - tr.width, br.height);

        resourceCointainer.addChild(l, r);
    }
    if (width > tl.width + tr.width && height > tl.height + bl.height) {

        c.width = width - (tl.width + tr.width);
        c.height = height - (tl.height + bl.height);
        c.position.set(tl.width, tl.height);

        resourceCointainer.addChild(c);
    }
    return resourceCointainer;
}

function slice(baseTexture: PIXI.BaseTexture, x: number, y: number, w: number, h: number) {
    return new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, w, h));
}