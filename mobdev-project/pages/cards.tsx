import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Modal } from 'react-native';
import { useState } from 'react';
import { imageMap, ownedCardsData } from '../components/image-map';

export const CardsScreen: React.FC = () => {
    useFonts({
        FredokaRegular: Fredoka_400Regular,
        FredokaMedium: Fredoka_500Medium,
        FredokaBold: Fredoka_700Bold,
      });

    type Card = {
        cardImagePath: any;
        name: string;
        type: any;
      };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    

    const handleCardPress = (card: Card) => {
        setSelectedCard(card);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedCard(null);
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.cardRow}>
                {ownedCardsData.map((card, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCardPress(card)}>
                        <View style={styles.cardItem}>
                            <Image source={imageMap[card.cardImagePath]} style={styles.card} />
                            <Text style={styles.cardName}>{card.name}</Text>
                            <Text>Type: {card.type}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedCard && (
                            <>
                                <Image source={imageMap[selectedCard.cardImagePath]} style={styles.modalImage}
                                />
                                <Text style={styles.modalCardName}>{selectedCard.name}</Text>
                                <Text style={styles.modalText}>Type: {selectedCard.type}</Text>
                                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    cardRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingTop: 20,
        marginLeft: 25,
    },
    cardItem: {
        alignItems: 'center',
        margin: 10,
        width: 100,
    },
    card: {
        height: 165,
        width: 110,
        marginBottom: 8,
    },
    cardName: {
        fontFamily: 'FredokaMedium',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 400, 
    },
    modalImage: {
        height: 450,
        width: 300,
        marginBottom: 10,
    },
    modalCardName: {
        fontFamily: 'FredokaMedium',
        fontSize: 22,
        marginBottom: 10,
    },
    modalText: {
        fontFamily: 'FredokaRegular',
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        fontFamily: 'FredokaRegular',
        color: '#000',
        fontSize: 18,
    },
});