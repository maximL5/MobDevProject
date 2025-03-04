





class Card {
    private effectMap: Map<EffectTypes, (card: Card) => void> = new Map([
        [EffectTypes.VULNERABLE, this.onVulnerable.bind(this)],
        [EffectTypes.POISON, this.onPoison.bind(this)],
        [EffectTypes.NONE, this.onNone.bind(this)]
    ])


    constructor(private name: string, 
                private health: number, 
                public attack1: Attack, 
                public attack2: Attack, 
                public attack3: Attack | null = null, 
                private damageScaler: number = 1,
                private damageOverTime: number = 0, 
                public moveList: Attack[] = [],
                private effectList: EffectTypes[] = []) 

    {
        this.moveList.push(attack1); 
        this.moveList.push(attack2); 
        if (attack3 != null) {
            this.moveList.push(attack3);
        }
    }

    onPoison(): void {
        this.damageOverTime += 1;
    }

    onVulnerable(): void {
        this.damageScaler += 1;
    }

    onNone(): void {
        return; 
    }

    //returns true if the card survives an attack, false if it dies
    receiveDamage(attack: Attack): boolean {
        this.health -= attack.damage * this.damageScaler;
        if (this.health <= 0) {
            return false;
        }
        //goes through the list of abilities and calls a function based on what the attack's ability was 
        const abilityExecution = this.effectMap.get(attack.ability.effect);
        if (abilityExecution &&! this.effectList.includes(attack.ability.effect)) {
            abilityExecution(this);
        }

        return true;
    }
}