import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


export function ShopScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.coinsText} >(coin icon): 100000</Text>
        <Text style={styles.shopText} >Shop resets in: {} battles</Text>
            <View style={styles.cardContainer} >
                <View style={styles.cardRow}>
                    <Image source={require('../assets/cardplaceholder.jpg')} style={styles.card} />
                    <Image source={require('../assets/cardplaceholder.jpg')} style={styles.card} />
                    <Image source={require('../assets/cardplaceholder.jpg')} style={styles.card} />
                </View>
                <View style={styles.cardRow}>
                    <Image source={require('../assets/cardplaceholder.jpg')} style={styles.card} />
                    <Image source={require('../assets/cardplaceholder.jpg')} style={styles.card} />
                </View>
            </View>
            <View style={styles.buttonCon}>
                <TouchableOpacity style={styles.button}>
                    <Text>
                        Purchase
                    </Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#808080',
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
        marginTop: 50,
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
        gap: 10,
        justifyContent: 'center',
        marginBottom: 10, 
    },
    
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        height: 180,
        width: 120,
        borderRadius: 10,
    }
  });
