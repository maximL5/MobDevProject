import { EffectTypes } from "./effecttypes";

export class Ability {
    constructor(public effect: EffectTypes) {
    }
}

export function mapEffectType(effectString: string): EffectTypes {
    switch (effectString?.toUpperCase()) {
        case 'POISON': return EffectTypes.POISON;
        case 'VULNERABLE': return EffectTypes.VULNERABLE;
        case 'NONE': return EffectTypes.NONE;
        default: return EffectTypes.NONE;
    }
}