import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import { imageMap, ownedCardsData } from '../components/image-map';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Card = {
  id: string;
  image: any;
  name: string;
};


export function DeckScreen() {
  useFonts({
      FredokaRegular: Fredoka_400Regular,
      FredokaMedium: Fredoka_500Medium,
      FredokaBold: Fredoka_700Bold,
  });

  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [savedDeck, setSavedDeck] = useState<Card[] | null>(null);

  
  useEffect(() => {
    const mappedCards: Card[] = ownedCardsData.map((card, index) => ({
      id: index.toString(),
      name: card.name,
      image: imageMap[card.cardImagePath] || require('../assets/cardplaceholder.jpg'),
    }));

    setCards(mappedCards);
  }, []);

  const toggleCardSelection = (id: string) => {
    setSelectedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : prev.length < 5
        ? [...prev, id]
        : prev
    );
  };

  const confirmDeck = async () => {
    if (selectedCards.length !== 5) {
      Alert.alert('Select 5 Cards', 'You must select exactly 5 cards to proceed.');
      return;
    }
  
    const selectedDeck = cards.filter(card => selectedCards.includes(card.id));
    setSavedDeck(selectedDeck);
  
    try {
      await AsyncStorage.setItem('savedDeck', JSON.stringify(selectedDeck));
      Alert.alert('Deck Confirmed', 'Your battle deck is ready!');
      console.log('Deck saved to storage.');
    } catch (e) {
      console.error('Failed to save the deck:', e);
    }
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
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
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
    paddingTop: 10,
  },
  chooseText: {
    fontFamily: 'FredokaRegular',
    fontSize: 24,
    color: 'black',
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
  },
  cardWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: 'black',
  },
  deck: {
    height: 200,
    width: 130,
    borderRadius: 10,
  },
  cardName: {
    fontFamily: 'FredokaMedium',
    marginTop: 5,
  },
  counterText: {
    fontFamily: 'FredokaRegular',
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  confirmButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  confirmEnabled: {
    backgroundColor: '#000',
  },
  confirmDisabled: {
    backgroundColor: '#999',
  },
  confirmText: {
    fontFamily: 'FredokaRegular',
    fontWeight: 'bold',
    fontSize: 18,
  },
  confirmTextEnabled: {
    color: 'white',
  },
  confirmTextDisabled: {
    color: '#444',
  },
});
