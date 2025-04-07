import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './pages/sign-in';
import { BattleScreen } from './pages/battle';
import { DeckScreen } from './pages/deck';
import { CardsScreen } from './pages/cards';
import { ShopScreen } from './pages/shop';

const Stack = createStackNavigator();


function HomeScreen({ navigation, route }: { navigation: any; route: any }) {
  useFonts({
    FredokaRegular: Fredoka_400Regular,
    FredokaMedium: Fredoka_500Medium,
    FredokaBold: Fredoka_700Bold,
  });

  const username = route.params?.username ?? "Stranger";


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <Text style={styles.text} >
      Welcome, {username}
    </Text>
    <View style={styles.container}>
      <Image source={require("./assets/logo-black.png")} style={styles.logo} alt={"deckless logo"}/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Battle')}>
        <Text style={styles.buttonText}>BATTLE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Deck')}>
        <Text style={styles.buttonText}>DECK</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cards')}>
        <Text style={styles.buttonText}>CARDS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shop')}>
        <Text style={styles.buttonText}>SHOP</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}



export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white'}}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Battle" component={BattleScreen} />
        <Stack.Screen name="Deck" component={DeckScreen} />
        <Stack.Screen name="Cards" component={CardsScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 100,
  },

  button: {
    backgroundColor: '#fff',
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 20,
    marginBottom: 25,
    borderColor: '#000', 
    borderWidth: 1, 
    alignItems: 'center', 
    width: 200, 
  },
  

  buttonText: {
    fontSize: 20,
    fontFamily: 'FredokaRegular',
  },

  logo: {
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    fontFamily: 'FredokaRegular',
    marginLeft: 20,
    marginTop: 50,
  },
  
});
