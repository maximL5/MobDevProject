import { createAttack } from './attack';
import { Attack } from './attack';
import { EffectTypes } from './effecttypes';

export enum CardTypes {
    ALPHA,
    BETA,
    SIGMA,
    OMEGA
}

export class Card {
    private effectMap: Map<EffectTypes, (card: Card) => void> = new Map([
        [EffectTypes.VULNERABLE, this.onVulnerable.bind(this)],
        [EffectTypes.POISON, this.onPoison.bind(this)],
        [EffectTypes.NONE, this.onNone.bind(this)]
    ]);

    constructor(
        public cardImagePath: string,
        public name: string,
        public type: CardTypes,
        public health: number,
        public attack1: Attack,
        public attack2: Attack,
        public attack3: Attack | null = null,
        private damageScaler: number = 1,
        private damageOverTime: number = 0,
        public moveList: Attack[] = [],
        private effectList: EffectTypes[] = []
    ) {
        this.moveList.push(attack1, attack2);
        if (attack3) this.moveList.push(attack3);
    }

    public getDS(): number {
        return this.damageScaler;
    }

    private onPoison(): void {
        this.damageOverTime += 1;
    }

    private onVulnerable(): void {
        this.damageScaler += 1;
    }

    private onNone(): void {
        // Do nothing
    }

    /**
     * Applies damage from an attack and triggers status effects if applicable.
     * @returns True if the card survives the attack, false if it dies.
     */
    receiveDamage(attack: Attack): boolean {
        this.health -= (attack.damage * this.damageScaler) + this.damageOverTime;

        if (this.health <= 0) {
            return false;
        }

        const effect = attack.ability.effect;
        const applyEffect = this.effectMap.get(effect);

        if (applyEffect && !this.effectList.includes(effect)) {
            applyEffect(this);
        }

        return true;
    }
}

/**
 * Converts a string into a corresponding CardTypes enum value.
 */
export function mapCardType(typeString: string): CardTypes {
    switch (typeString.toUpperCase()) {
        case 'ALPHA': return CardTypes.ALPHA;
        case 'BETA': return CardTypes.BETA;
        case 'SIGMA': return CardTypes.SIGMA;
        case 'OMEGA': return CardTypes.OMEGA;
        default: throw new Error(`Unknown card type: ${typeString}`);
    }
}

/**
 * Creates a Card instance from raw card data.
 */
export function createCard(cardData: any): Card {
    return new Card(
        cardData.cardImagePath,
        cardData.name,
        mapCardType(cardData.type),
        cardData.health,
        createAttack(cardData.attack1)!,
        createAttack(cardData.attack2)!,
        createAttack(cardData.attack3) ?? null,
        cardData.damageScaler ?? 1,
        cardData.damageOverTime ?? 0,
        [],
        cardData.effectList?.map((effect: string) => mapCardType(cardData.type)) ?? []
    );
}
