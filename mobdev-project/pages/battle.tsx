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
  const [showCardPicker, setShowCardPicker] = useState(false);


  const [playerDeck, setPlayerDeck] = useState<Card[]>(loadedPlayerDeck);
  const [enemyDeck, setEnemyDeck] = useState<Card[]>(loadedEnemyDeck);

  const [player, setPlayer] = useState<Card>(playerDeck[0]);
  const [enemy, setEnemy] = useState<Card>(enemyDeck[0]);


  const [pHealth, setPHealth] = useState<number>(player.health);
  const [eHealth, setEHealth] = useState<number>(enemy.health);



  const updatePlayerCard = (newCard: Card) => {
    setPlayer(newCard);
    setPHealth(newCard.health);
    
  }

  const pickNewCard = () => {
    let oldCard = player;
    setPlayerDeck(prevDeck => prevDeck.filter(card => card.name !== oldCard.name));
    setShowCardPicker(true);
  };
  

  const handleAttack = (attack: Attack) => {
    if (!playerTurn) return;

    const enemyAlive = enemy.receiveDamage(attack);
    setEHealth(enemy.health);
    if (!enemyAlive) {
      if (enemyDeck.length > 0) {
        console.log(enemy.name)
        enemyDeck.forEach(
          card => console.log(card.name)
        )
        setEnemyDeck(prevDeck => prevDeck.filter(card => card.name != enemy.name))
        const newEnemy = getRandomItem(enemyDeck)
        setEnemy(newEnemy)
        setEHealth(newEnemy.health);
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
        if (playerDeck.length > 1) {
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
        <View style={styles.cardWrapper1}>
          <Image
            source={imageMap[enemy.cardImagePath]}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardName}>{enemy.name}</Text>
          <Text style={styles.hp}>HP: {eHealth}</Text>
        </View>

        <View style={styles.cardWrapper2}>
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

      {showCardPicker && (
  <View style={styles.cardPickerOverlay}>
    <Text style={styles.modalTitle}>Pick a New Card</Text>
    {playerDeck.map((card, index) => (
      <TouchableOpacity
        key={index}
        style={styles.cardOption}
        onPress={() => {
          updatePlayerCard(card);
          setShowCardPicker(false);
        }}
      >
        <Image source={imageMap[card.cardImagePath]} style={styles.cardOptionImage} />
        <Text style={styles.cardOptionText}>{card.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}



    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 32,
    color: '#ffda6f',
    marginVertical: 20,
    fontWeight: '900',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 30,
  },
  cardWrapper1: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff5f56',
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
  cardWrapper2: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#43A047',
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
  cardImage: {
    width: 140,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
  },
  hp: {
    color: '#3eff3e',
    fontSize: 16,
    fontWeight: '600',
  },
  attackButtons: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  attackButton: {
    backgroundColor: '#4444dd',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    width: '85%',
    shadowColor: '#4444dd',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 6,
  },
  attackText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  disabledButton: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  turnText: {
    marginTop: 25,
    fontSize: 20,
    color: '#ffcc00',
    fontWeight: 'bold',
  },
  cardPickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    padding: 20,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 26,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    width: '90%',
    borderWidth: 1,
    borderColor: '#555',
  },
  cardOptionImage: {
    width: 60,
    height: 85,
    borderRadius: 6,
    marginRight: 12,
  },
  cardOptionText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
  },
});
