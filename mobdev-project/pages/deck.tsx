import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert } from 'react-native';

// Dummy card data - replace with actual card data later
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
      if (selectedCards.length >= 5) {
        Alert.alert('Limit Reached', 'You can only select up to 5 cards.');
        return;
      }
      setSelectedCards(prev => [...prev, id]);
    }
  };

  const confirmDeck = () => {
    if (selectedCards.length < 1) {
      Alert.alert('Select Cards', 'Please select at least one card to proceed.');
      return;
    }

    Alert.alert('Deck Confirmed', `You selected ${selectedCards.length} card(s)!`);
    // You could also store the deck in a global state here
  };

  const renderCard = ({ item }: { item: { id: string; image: any; name: string } }) => {
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
      <Text style={styles.chooseText}>Select up to 5 cards</Text>
      <FlatList
        data={dummyCards}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
      />
      <Text style={styles.counterText}>Selected: {selectedCards.length}/5</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={confirmDeck}>
        <Text style={styles.confirmText}>Confirm Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
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
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
  },
  confirmText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
