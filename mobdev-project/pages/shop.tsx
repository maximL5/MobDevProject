import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export function ShopScreen() {
    return (
      <View style={styles.container}>
        <Text>Shop Screen</Text>
      </View>
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
