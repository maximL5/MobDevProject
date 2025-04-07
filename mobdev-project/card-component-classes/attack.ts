import { EffectTypes } from "./effecttypes";
import { Ability, mapEffectType } from "./ability";

export class Attack {

    //default ability is none but can be set manually if desired 
    constructor(public name: string, 
        public damage: number, 
        public ability: Ability = new Ability(EffectTypes.NONE)) {
    }
}

export function createAttack(attackData: any): Attack | null {
    if (!attackData) return null;
    return new Attack(
        attackData.name,
        attackData.damage,
        new Ability(mapEffectType(attackData.ability)) // fix coming up below
    );
}
