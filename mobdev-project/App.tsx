import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BattleScreen } from './pages/battle';
import { DeckScreen } from './pages/deck';
import { ShopScreen } from './pages/shop';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Pee pee poo poo</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Battle')}>
        <Text style={styles.buttonText}>Battle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Deck')}>
        <Text style={styles.buttonText}>Deck</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shop')}>
        <Text style={styles.buttonText}>Shop</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Battle" component={BattleScreen} />
        <Stack.Screen name="Deck" component={DeckScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#808080',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 20,
  }
});
