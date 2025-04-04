import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { purchase } from '../shop-classes/shop';
import { useState } from 'react';
import cardsList from '../res/cards.json';
import { imageMap, cardsData } from '../shop-classes/image-map';

function AddToCart() {
    const [card, selectCard] = useState("");
}


const coins = 0;
const resetAmount = 0;
const cardsDisplayed = 5;
const totalCost = 0;




export function ShopScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.coinsText} >Coins: {coins}</Text>
        <Text style={styles.shopText} >Shop resets in: {resetAmount} battles</Text>
        <Shop></Shop>
      </View>
    );
}

const Shop: React.FC = () => {
    //hard coded to only display 4 cards for now
    const visibleCards = cardsData.slice(0, 5);
    return (
        <View style={styles.cardRow}>
          {visibleCards.map((card, index) => (
            <View key={index} style={{ alignItems: 'center', margin: 10 }}>
              <Image source={imageMap[card.cardImagePath]} style={styles.card} />
              <Text style={{ fontWeight: 'bold' }}>{card.name}</Text>
              <Text>Type: {card.type}</Text>
              <Text>Cost: {card.cost} coins</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.buttonCon} >
            <Text style={styles.button} >
                Purchase
            </Text>
          </TouchableOpacity>
        </View>
      );
  };
  
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',  
      justifyContent: 'center', 
    },

    shopText: {
        position: 'absolute', 
        top: 10, 
        right: 10, 
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    button: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
    },

    buttonCon: {
        width: '100%',  
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        paddingRight: 20, 
        marginTop: 50, 
    },

    coinsText: {
        position: 'absolute', 
        top: 10, 
        left: 10,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    cardRow: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
    },
    
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        height: 165,
        width: 110,
    }
  });
