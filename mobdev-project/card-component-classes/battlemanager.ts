
import { Card, CardTypes } from "./card";


export class BattleManager {

    public battleText: String = ""; 

    private attackOne: Attack = new Attack("M'Lady", 8, new Ability(EffectTypes.NONE))
    private attackTwo: Attack = new Attack("UNLIMITED RIZZ", 0, new Ability(EffectTypes.VULNERABLE))

    private playerCard: Card = new Card("rizzler.png", "THE RIZZLER", CardTypes.ALPHA, 20, this.attackOne, this.attackTwo)
    private enemyCard: Card = new Card("rizzler.png", "THE RIZZLER", CardTypes.ALPHA, 20, this.attackOne, this.attackTwo)




    getRandomItem<T>(arr: T[]): T {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }



    //at the moment the player has no choice in what attack they do, it just returns the first one for testing purposes 
    promptPlayer() {
        //wait for player choice on attack
        this.battleText = this.playerCard.attack1.name + " or " + this.playerCard.attack2.name;
        return this.playerCard.attack1;
    }

    
    

    turnExecution() {
        let playerAttack = this.promptPlayer();
        let attackResult = this.enemyCard.receiveDamage(playerAttack);
        if (attackResult) {
            this.battleText = this.enemyCard.name + " received " + playerAttack.damage + " damage!";
        } else {
            this.battleText = this.enemyCard.name + " died LMAO!!!";
        }
        let enemyAttack = this.getRandomItem(this.enemyCard.moveList);
        attackResult
        if (attackResult) {
            this.battleText = this.playerCard.name + " received " + enemyAttack.damage + " damage!";
        } else {
            this.battleText = this.playerCard.name + " died LMAO!!!";
        }

    }


    //on battle start sort through enemy deck and pick a random card
    //pick first card in player deck






// player chooses move
// if enemy card dies, draw new card
//      if cant, player wins
// else enemy uses random attack
// if player dies prompt to switch card
//      if no cards available lose state 

}