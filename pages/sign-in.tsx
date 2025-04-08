import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_500Medium, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';



export function SignInScreen({ navigation }: { navigation: any }) {
    useFonts({
        FredokaRegular: Fredoka_400Regular,
        FredokaMedium: Fredoka_500Medium,
        FredokaBold: Fredoka_700Bold,
      });


    const [username, setUsername] = useState('');
    return(
        <View style={styles.container} >
            <Image source={require("../assets/logo-white.png")} style={styles.logo} alt={"deckless logo"}/>
            <Text style={styles.text} >
                Enter nickname to start.
            </Text>
            <TextInput 
             style={styles.input}
             value={username}
             onChangeText={setUsername}
            >

            </TextInput>
            <TouchableOpacity style={styles.button} onPress={() => {
                if (username.trim()) {
            navigation.navigate('Home', { username });
            console.log('username saved');
            }}}>
                <Text style={styles.buttonText} >PLAY!</Text>
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15, 
        paddingHorizontal: 40, 
        borderRadius: 20,
        marginTop: 25,
        borderColor: '#000', 
        borderWidth: 2, 
        alignItems: 'center', 
        width: 200, 
    },

    buttonText: {
        fontSize: 20,
        color: '#000'
    },
  
    text: {
        fontFamily: 'FredokaRegular',
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },

    logo: {
        justifyContent: 'center',
    },

    input: {
        fontFamily: 'FredokaRegular',
        borderWidth: 1,            
        borderColor: '#fff',       
        borderRadius: 8,           
        padding: 5,               
        width: 200, 
        color: '#fff',
    }
  });