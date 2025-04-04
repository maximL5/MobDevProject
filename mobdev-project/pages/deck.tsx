import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardsScreen } from './cards';

const DeckStack = createStackNavigator();

const Stack = createStackNavigator();

function DeckMain({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Card')}>
        <Text>VIEW CARDS</Text>
      </TouchableOpacity>
      
      <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <DeckButton />
            <DeckButton />
          </View>
          <View style={styles.cardRow}>
            <DeckButton />
            <DeckButton />
          </View>
      </View>
    </View>
  );
}

export function DeckScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DeckMain" 
        component={DeckMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Card" 
        component={CardsScreen}
      />
    </Stack.Navigator>
  );
}

function DeckButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={require('../assets/cardplaceholder.jpg')} style={styles.deck} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 57,
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  deck: {
    height: 180,
    width: 120,
    borderRadius: 10,
  },
});
