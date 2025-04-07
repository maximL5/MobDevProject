import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, createCard } from '../card-component-classes/card';
import { Attack } from '../card-component-classes/attack';
import { EffectTypes } from '../card-component-classes/effecttypes';
import { Ability } from '../card-component-classes/ability';
import { imageMap } from '../components/image-map';
import awesomeDeck from '../res/deck.json';
import suckyDeck from '../res/enemyDeck.json';


const loadedPlayerDeck: Card[] = [];


for (const unmadeCard of awesomeDeck) {
  const newCard = createCard(unmadeCard);


  if (unmadeCard.attack1.ability == "NONE") {
    newCard.attack1.setAbility(EffectTypes.NONE)
  }

  if (unmadeCard.attack1.ability == "VULNERABLE") {
    newCard.attack1.setAbility(EffectTypes.VULNERABLE)
  }

  if (unmadeCard.attack1.ability == "POISON") {
    newCard.attack1.setAbility(EffectTypes.POISON)
  }



  if (unmadeCard.attack2.ability == "NONE") {
    newCard.attack2.setAbility(EffectTypes.NONE)
  }

  if (unmadeCard.attack2.ability == "VULNERABLE") {
    newCard.attack2.setAbility(EffectTypes.VULNERABLE)
  }

  if (unmadeCard.attack2.ability == "POISON") {
    newCard.attack2.setAbility(EffectTypes.POISON)
  }




  loadedPlayerDeck.push(newCard);
}

const loadedEnemyDeck: Card[] = [];


for (const unmadeCard of suckyDeck) {
  const newCard = createCard(unmadeCard);

  
  if (unmadeCard.attack1.ability == "NONE") {
    newCard.attack1.setAbility(EffectTypes.NONE)
  }

  if (unmadeCard.attack1.ability == "VULNERABLE") {
    newCard.attack1.setAbility(EffectTypes.VULNERABLE)
  }

  if (unmadeCard.attack1.ability == "POISON") {
    newCard.attack1.setAbility(EffectTypes.POISON)
  }

  if (unmadeCard.attack2 == null) {
    newCard.setAttack2(newCard.attack1);
  }

  if (unmadeCard.attack2 != null) {
    if (unmadeCard.attack2.ability == "NONE") {
    newCard.attack2.setAbility(EffectTypes.NONE)
    }

    if (unmadeCard.attack2.ability == "VULNERABLE") {
      newCard.attack2.setAbility(EffectTypes.VULNERABLE)
    }

    if (unmadeCard.attack2.ability == "POISON") {
      newCard.attack2.setAbility(EffectTypes.POISON)
    }
  }
  

  loadedEnemyDeck.push(newCard);
}


function getRandomItem<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}



export function BattleScreen() {
  
  const [playerTurn, setPlayerTurn] = useState(true);

  const [playerDeck, setPlayerDeck] = useState<Card[]>(loadedPlayerDeck);
  const [enemyDeck, setEnemyDeck] = useState<Card[]>(loadedEnemyDeck);

  const [player, setPlayer] = useState<Card>(playerDeck[0]);
  const [enemy, setEnemy] = useState<Card>(enemyDeck[0]);


  const [pHealth, setPHealth] = useState<number>(player.health);
  const [eHealth, setEHealth] = useState<number>(enemy.health);



  const updatePlayerCard = (newCard: Card) => {
    setPlayer(playerDeck[2])
    setPHealth(player.health);
  }

  const pickNewCard = () => {
    Alert.alert(
      "Pick a new card", 
      "",  
      [
        {
          text: `${playerDeck[2].name}`,
          onPress: () => updatePlayerCard(playerDeck[2]),
        },
      ]
    );
  };
  

  const handleAttack = (attack: Attack) => {
    if (!playerTurn) return;

    const enemyAlive = enemy.receiveDamage(attack);
    setEHealth(enemy.health)

    if (!enemyAlive) {
      if (enemyDeck.length > 0) {
        setEnemyDeck(prevDeck => prevDeck.filter(card => card.name !== enemy.name))
        setEnemy(getRandomItem(enemyDeck))
      } else {
        Alert.alert('Victory!', 'You defeated the enemy!');
        return;
      }

      
    }

    setPlayerTurn(false);


    setTimeout(() => {
      const enemyAttack = Math.random() < 0.5 ? enemy.attack1 : enemy.attack2;
      const playerAlive = player.receiveDamage(enemyAttack);
      setPHealth(player.health);

      if (!playerAlive) {
        if (playerDeck.length > 0) {
          pickNewCard();
        } else {
          Alert.alert('Defeat...', 'You were defeated!');
          return;
        }

        
      }

      setPlayerTurn(true);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle Arena</Text>

      <View style={styles.cardRow}>
        <View style={styles.cardWrapper}>
          <Image
            source={imageMap[enemy.cardImagePath]}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardName}>{enemy.name}</Text>
          <Text style={styles.hp}>HP: {eHealth}</Text>
        </View>

        <View style={styles.cardWrapper}>
          <Image
            source={imageMap[player.cardImagePath]}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardName}>{player.name}</Text>
          <Text style={styles.hp}>HP: {pHealth}</Text>
        </View>
      </View>

      <View style={styles.attackButtons}>
        {player.moveList.map((atk, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.attackButton,
              !playerTurn && styles.disabledButton
            ]}
            onPress={() => handleAttack(atk)}
            disabled={!playerTurn}
          >
            <Text style={styles.attackText}>{atk.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.turnText}>
        {playerTurn ? "Your Turn" : "Enemy's Turn..."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  cardImage: {
    width: 130,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  hp: {
    color: 'lime',
    marginTop: 5,
    fontSize: 16,
  },
  attackButtons: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  attackButton: {
    backgroundColor: '#444',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    width: '80%',
  },
  attackText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#777',
  },
  turnText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
  },
});
