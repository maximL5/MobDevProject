import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useState } from 'react';
import { imageMap } from '../components/image-map';
import { cardsData } from '../components/image-map';
import { CardTypes } from '../card-component-classes/card';


const coins = 0;
const resetAmount = 0;
const totalCost = 0;




export function ShopScreen() {
  useFonts({
    FredokaRegular: Fredoka_400Regular,
    FredokaMedium: Fredoka_500Medium,
    FredokaBold: Fredoka_700Bold,
  });


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
              <Text>Type: {CardTypes[card.type]}</Text>
            </View>
          ))}
          <View>
            <Text style={styles.coinsText} >Total: {totalCost} </Text>
            <TouchableOpacity style={styles.buttonCon} >
              <Text style={styles.button} >
                  PURCHASE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  };
  
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',  
      justifyContent: 'center', 
    },

    shopText: {
        fontFamily: 'FredokaRegular',
        position: 'absolute', 
        top: 10, 
        right: 10, 
        fontSize: 16,
        color: 'black',
    },

    button: {
      fontFamily: 'FredokaRegular',
        backgroundColor: '#000',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginTop: 10,
        color: 'white'
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
        fontFamily: 'FredokaMedium',
        position: 'absolute', 
        top: 10, 
        left: 10,
        fontSize: 16,
        color: 'black',
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
