
class Attack {

    //default ability is none but can be set manually if desired 
    constructor(public name: string, 
        public damage: number, 
        public ability: Ability = new Ability(EffectTypes.NONE)) {
    }
}