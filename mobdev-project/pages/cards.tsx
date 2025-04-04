import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { imageMap, cardsData } from '../shop-classes/image-map';

export const CardsScreen: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.cardRow}>
                {cardsData.map((card, index) => (
                    <View key={index} style={styles.cardItem}>
                        <Image source={imageMap[card.cardImagePath]} style={styles.card} />
                        <Text style={styles.cardName}>{card.name}</Text>
                        <Text>Type: {card.type}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20, 
    },
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
    },
    buttonCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 40, 
    },
    buttonText: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    cardRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 20,
    },
    cardItem: {
        alignItems: 'center',
        margin: 10,
        width: 140, 
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 165,
        width: 110,
        marginBottom: 8, 
    },
    cardName: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
});