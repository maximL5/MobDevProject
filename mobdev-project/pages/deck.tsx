import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert } from 'react-native';

type Card = {
  id: string;
  image: any; // or ImageSourcePropType if you want stricter typing
  name: string;
};


// Dummy card data
const dummyCards = [
  { id: '1', image: require('../assets/cardplaceholder.jpg'), name: 'Card A' },
  { id: '2', image: require('../assets/cardplaceholder.jpg'), name: 'Card B' },
  { id: '3', image: require('../assets/cardplaceholder.jpg'), name: 'Card C' },
  { id: '4', image: require('../assets/cardplaceholder.jpg'), name: 'Card D' },
  { id: '5', image: require('../assets/cardplaceholder.jpg'), name: 'Card E' },
  { id: '6', image: require('../assets/cardplaceholder.jpg'), name: 'Card F' },
];

export function DeckScreen() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const toggleCardSelection = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(prev => prev.filter(cardId => cardId !== id));
    } else {
      if (selectedCards.length >= 5) return; // Block selection beyond 5
      setSelectedCards(prev => [...prev, id]);
    }
  };

  const confirmDeck = () => {
    if (selectedCards.length !== 5) {
      Alert.alert('Select 5 Cards', 'You must select exactly 5 cards to proceed.');
      return;
    }

    Alert.alert('Deck Confirmed', 'Your battle deck is ready!');
    // Save deck or navigate to next screen here
  };

  const renderCard = ({ item }: { item: Card }) => {
    const isSelected = selectedCards.includes(item.id);
  
    return (
      <TouchableOpacity
        style={[styles.cardWrapper, isSelected && styles.selectedCard]}
        onPress={() => toggleCardSelection(item.id)}
      >
        <Image source={item.image} style={styles.deck} />
        <Text style={styles.cardName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.chooseText}>Pick exactly 5 cards for your deck</Text>
      <FlatList
        data={dummyCards}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
      />
      <Text style={styles.counterText}>
        Selected: {selectedCards.length}/5
      </Text>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          selectedCards.length === 5 ? styles.confirmEnabled : styles.confirmDisabled,
        ]}
        onPress={confirmDeck}
        disabled={selectedCards.length !== 5}
      >
        <Text
          style={[
            styles.confirmText,
            selectedCards.length === 5 ? styles.confirmTextEnabled : styles.confirmTextDisabled,
          ]}
        >
          Confirm Deck
        </Text>
      </TouchableOpacity>

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  chooseText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  cardRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,

  cardWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: 'gold',
  },
  deck: {
    height: 150,
    width: 100,
    borderRadius: 10,
  },
  cardName: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  confirmButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
  },
  confirmEnabled: {
    backgroundColor: '#00FF7F',
  },
  confirmDisabled: {
    backgroundColor: '#999',
  },
  confirmText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  confirmTextEnabled: {
    color: 'black',
  },
  confirmTextDisabled: {
    color: '#444',
  },
});
