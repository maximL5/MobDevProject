import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export function DeckScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.chooseText}>Choose a Deck</Text>
      <View style={styles.cardContainer}>
        <View style={styles.cardRow}>
          <DeckButton />
          <DeckButton />
        </View>
        <View style={styles.cardRow}>
          <DeckButton />
          <DeckButton />
        </View>
      </View>
    </View>
  );
}

function DeckButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={require('../assets/cardplaceholder.jpg')} style={styles.deck} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 57,
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 50,
  },
  deck: {
    height: 180,
    width: 120,
    borderRadius: 10,
  },
});
