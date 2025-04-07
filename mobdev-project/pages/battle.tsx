import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, createCard } from '../card-component-classes/card';
import { Attack } from '../card-component-classes/attack';
import { EffectTypes } from '../card-component-classes/effecttypes';
import { Ability } from '../card-component-classes/ability';
import { imageMap } from '../components/image-map';
import awesomeDeck from '../res/deck.json';
import suckyDeck from '../res/enemyDeck.json';

// Sample attacks (replace with real ones if needed)
const basicAttack: Attack = {
  name: "M'LADY",
  damage: 8,
  ability: new Ability(EffectTypes.NONE)
};

const poisonAttack: Attack = {
  name: 'UNLIMITED RIZZ',
  damage: 1,
  ability: new Ability(EffectTypes.VULNERABLE)
};

// Sample cards for battle (replace with dynamic ones later)
const playerCard = new Card('rizzler.png', 'Rizzler', 0, 100, basicAttack, poisonAttack);
const enemyCard = new Card('peaked.png', 'Peaked', 1, 100, poisonAttack, basicAttack);


const loadedPlayerDeck: Card[] = [];


for (const unmadeCard of awesomeDeck) {
  const newCard = createCard(unmadeCard);
  loadedPlayerDeck.push(newCard);
}

const loadedEnemyDeck: Card[] = [];


for (const unmadeCard of suckyDeck) {
  const newCard = createCard(unmadeCard);
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


  const [pHealth, setPHealth] = useState<number>(playerCard.health);
  const [eHealth, setEHealth] = useState<number>(enemyCard.health);



  const updatePlayerCard = (newCard: Card) => {
    setPlayer(new Card('gigachad.png', 'gigachad', 2, 100, basicAttack, poisonAttack))
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
