import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Modal } from 'react-native';
import { useState } from 'react';
import { imageMap } from '../components/image-map';
import { ownedCardsData } from '../components/image-map';
import { Card } from '../card-component-classes/card';
import { CardTypes } from '../card-component-classes/card';
import { EffectTypes } from '../card-component-classes/effecttypes';
import { useNavigation } from '@react-navigation/native';



export const CardsScreen: React.FC = () => {
    useFonts({
        FredokaRegular: Fredoka_400Regular,
        FredokaMedium: Fredoka_500Medium,
        FredokaBold: Fredoka_700Bold,
      });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const navigation = useNavigation();

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
              {/* Back Button */}
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={require('../assets/cardsBack.png')} style={styles.backIcon} />
              </TouchableOpacity>
            <View style={styles.cardRow}>
                {ownedCardsData.map((card , i) => (
                    <TouchableOpacity key={i} onPress={() => handleCardPress(card)}>
                        <View style={styles.cardItem}>
                            <Image source={imageMap[card.cardImagePath]} style={styles.card} />
                            <Text style={styles.cardName}>{card.name}</Text>
                            <Text>Type: {CardTypes[card.type]}</Text>

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
                                <Text style={styles.modalText}>Type: {CardTypes[selectedCard.type]} | Health: {[selectedCard.health]}</Text>

                                <Text style={styles.modalText}>
                                    Attack 1: {[selectedCard.attack1.name]} | Damage: {[selectedCard.attack1.damage]} | 
                                    Effect: {selectedCard.attack1 ? EffectTypes[selectedCard.attack1.ability.effect] : "N/A"}
                                </Text>
                                <Text style={styles.modalText}>
                                    Attack 2: {selectedCard.attack2 ? selectedCard.attack2.name : "N/A"} | Damage: {selectedCard.attack2 ? selectedCard.attack2.damage : "N/A"} | 
                                    Effect: {selectedCard.attack2 ? EffectTypes[selectedCard.attack2.ability.effect] : "N/A"}
                                </Text>
                                <Text style={styles.modalText}>
                                
                                </Text>
                                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                                    <Text style={styles.closeButtonText}>CLOSE</Text>
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
        paddingTop: 80,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        paddingTop: 35,
    },
    backIcon: {
        height: 25,
        width: 117,
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