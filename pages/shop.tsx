import { useFonts } from 'expo-font';
import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { imageMap, cardsData } from '../components/image-map';
import { CardTypes } from '../card-component-classes/card';

const coins = 10000;
const resetAmount = 0;
const totalCost = 0;

export function ShopScreen() {
  useFonts({
    FredokaRegular: Fredoka_400Regular,
    FredokaMedium: Fredoka_500Medium,
    FredokaBold: Fredoka_700Bold,
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/shopBack.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Top Labels */}
      <Text style={styles.coinsText}>Coins: {coins}</Text>
      <Text style={styles.shopText}>Shop resets in: {resetAmount} battles</Text>

      {/* Scrollable Card List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Shop />
      </ScrollView>
    </View>
  );
}

const Shop: React.FC = () => {
  const visibleCards = cardsData.slice(0, 5);

  return (
    <View style={styles.shopWrapper}>
      <View style={styles.cardGrid}>
        {visibleCards.map((card, index) => (
          <TouchableOpacity key={index} style={styles.cardContainer}>
            <Image
              source={imageMap[card.cardImagePath]}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardType}>Type: {CardTypes[card.type]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.purchaseWrapper}>
        <Text style={styles.totalText}>Total: {totalCost}</Text>
        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>PURCHASE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ---------------------- Styles ---------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingTop: 30,
    zIndex: 2,
  },

  backIcon: {
    height: 25,
    width: 117,
  },

  coinsText: {
    fontFamily: 'FredokaMedium',
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    color: 'black',
    zIndex: 1,
  },

  shopText: {
    fontFamily: 'FredokaRegular',
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 16,
    color: 'black',
    zIndex: 1,
  },

  scrollContent: {
    paddingTop: 70,
    paddingBottom: 40,
    alignItems: 'center',
  },

  shopWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  cardContainer: {
    alignItems: 'center',
    margin: 10,
  },

  cardImage: {
    width: 110,
    height: 165,
  },

  cardName: {
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },

  cardType: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
  },

  purchaseWrapper: {
    width: '90%',
    alignItems: 'flex-end',
  },

  totalText: {
    fontFamily: 'FredokaMedium',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },

  purchaseButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 20,
  },

  purchaseButtonText: {
    fontFamily: 'FredokaRegular',
    fontSize: 16,
    color: '#fff',
  },
});
