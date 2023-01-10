import * as PIXI from 'pixi.js';
import { resolveCompressedTextureUrl } from 'pixi.js';

export type ButtonParts = [
    [PIXI.Texture, PIXI.Texture, PIXI.Texture],
    [PIXI.Texture, PIXI.Texture, PIXI.Texture],
    [PIXI.Texture, PIXI.Texture, PIXI.Texture]
]

export async function resourceTexture(url: string){

    const resourceBT = PIXI.BaseTexture.from(url);

    await new Promise((resolve, reject) => {
        resourceBT.on('loaded', resolve);
        resourceBT.on('error', reject);
    });

    return resourceBT;
}

