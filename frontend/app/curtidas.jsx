import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {

return ( 
    
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.headerText}>Suas Curtidas</Text>
    </View>

{}
<View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart" size={80} color="#ffd7d3" /> {}
        </TouchableOpacity>
      </View>


    <View style={styles.content}>
        <Text style={styles.contentText1}>Ainda sem curtidas</Text>
    </View>

    <View style={styles.content}>
        <Text style={styles.contentText2}>Comece a descobrir músicas para ver
         suas curtidas aqui!</Text>
    </View> 

    <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Player</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Curtidas</Text>
    
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}> 
            <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
    </View>

</SafeAreaView>

);
};

const styles = StyleSheet.create({
container:{
    flex: 1,
   backgroundColor: '#a25da8',
    
    
},
header:{
    backgroundColor: '#909090',
    padding: 20,
    alignItems: 'center',
},

headerText:{
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
},

iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: '#dd5c5c',
    borderRadius: 50, // Borda arredondada
    padding: 20, // Espaçamento ao redor do ícone
    elevation: 5, // Sombra para dar um efeito de profundidade
  },
  
nav:{
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    marginBottom: 2,
},

navItem:{
    padding: 10,
},

navText:{
    fontSize: 16,
    color:'#3333',
},

content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
    

contentText1: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',

},
contentText2: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
},
footer: {
    backgroundColor: '#4A90E2',
    padding: 15,
    alignItems: 'center',
},
footerText:{
    color: '#fff'
}

});

export default App;