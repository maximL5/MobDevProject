import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card } from '../card-component-classes/card';
import { Attack } from '../card-component-classes/attack';
import { imageMap } from '../components/image-map';

// Sample attacks (replace with real ones if needed)
const basicAttack: Attack = {
  name: 'Basic Slash',
  damage: 10,
  ability: { effect: 0 }
};

const poisonAttack: Attack = {
  name: 'Toxic Bite',
  damage: 6,
  ability: { effect: 1 }
};

// Sample cards for battle (replace with dynamic ones later)
const playerCard = new Card('rizzler.png', 'Rizzler', 0, 100, basicAttack, poisonAttack);
const enemyCard = new Card('peaked.png', 'Peaked', 1, 100, poisonAttack, basicAttack);

export function BattleScreen() {
  const [player, setPlayer] = useState<Card>(playerCard);
  const [enemy, setEnemy] = useState<Card>(enemyCard);
  const [playerTurn, setPlayerTurn] = useState(true);

  const handleAttack = (attack: Attack) => {
    if (!playerTurn) return;

    const enemyAlive = enemy.receiveDamage(attack);
    setEnemy(new Card(
      enemy.cardImagePath,
      enemy.name,
      enemy.type,
      enemy.health,
      enemy.attack1,
      enemy.attack2,
      enemy.attack3
    ));

    if (!enemyAlive) {
      Alert.alert('Victory!', 'You defeated the enemy!');
      return;
    }

    setPlayerTurn(false);

    setTimeout(() => {
      const enemyAttack = Math.random() < 0.5 ? enemy.attack1 : enemy.attack2;
      const playerAlive = player.receiveDamage(enemyAttack);
      setPlayer(new Card(
        player.cardImagePath,
        player.name,
        player.type,
        player.health,
        player.attack1,
        player.attack2,
        player.attack3
      ));

      if (!playerAlive) {
        Alert.alert('Defeat...', 'You were defeated!');
        return;
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
          <Text style={styles.hp}>HP: {enemy.health}</Text>
        </View>

        <View style={styles.cardWrapper}>
          <Image
            source={imageMap[player.cardImagePath]}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardName}>{player.name}</Text>
          <Text style={styles.hp}>HP: {player.health}</Text>
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
