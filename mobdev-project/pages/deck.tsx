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
import { useNavigation } from '@react-navigation/native';

import { imageMap } from '../components/image-map';
import { ownedCardsData } from '../components/image-map';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Card } from '../card-component-classes/card';

export function DeckScreen() {
  useFonts({
    FredokaRegular: Fredoka_400Regular,
    FredokaMedium: Fredoka_500Medium,
    FredokaBold: Fredoka_700Bold,
  });

  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [savedDeck, setSavedDeck] = useState<Card[] | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const mappedCards: Card[] = ownedCardsData.map((cardData, index) => {
      const card = new Card(
        cardData.cardImagePath,
        cardData.name,
        cardData.type,
        cardData.health,
        cardData.attack1,
        cardData.attack2,
        cardData.attack3 ?? null
      );

      (card as any).id = index.toString();

      return card;
    });

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

    const selectedDeck = cards.filter((card) => selectedCards.includes((card as any).id));
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
    const id = (item as any).id;
    const isSelected = selectedCards.includes(id);

    return (
      <TouchableOpacity
        style={[styles.cardWrapper, isSelected && styles.selectedCard]}
        onPress={() => toggleCardSelection(id)}
      >
        <Image
          source={imageMap[item.cardImagePath] || require('../assets/cardplaceholder.jpg')}
          style={styles.deck}
        />
        <Text style={styles.cardName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/deckBack.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.chooseText}>Pick exactly 5 cards for your deck</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => (item as any).id}
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
      />
      <Text style={styles.counterText}>Selected: {selectedCards.length}/5</Text>
      <TouchableOpacity
        style={[styles.confirmButton, selectedCards.length === 5 ? styles.confirmEnabled : styles.confirmDisabled]}
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
    paddingTop: 100,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    paddingTop: 35,
  },
  backIcon: {
    width: 105,
    height: 21,
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
