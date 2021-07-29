import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Keyboard, FlatList} from 'react-native';
import {AntDesign} from '@expo/vector-icons'; 
import GlobalStyle from '../styles/GlobalStyle';
import Theme from '../styles/Theme';
import {Input} from '../components/Input';
import {ItemGit} from '../components/ItemGit';
import api from '../services/api';
import {AsyncStorage} from 'react-native';

export function Home({navigation}) {

  const keyAsyncStorage = "@GIT.NETWORK:usuarios";
  const [ nickname,setNickname ] = useState('');
  const [ users,setUsers ] = useState([]);

  function navigationDetails( login){
      navigation.navigate('details', {user: login});
  }

  async function handleSearchUser( ){
    try {
      response = await api.get('/users/' + nickname);
      const {data} = response;
      const obj = {
        id: data.id,
        nome: data.name,
        login: data.login,
        avatar_url: data.avatar_url,
      }

      const vetData = [...users, obj]; 
        
      try{
          await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify( vetData ) );
      }catch(error){
          Alert.alert("Erro no salvamento de usuários");
      } 

      setNickname('');  
      loadData(); 
      console.log(obj);

    }catch(error){
    console.error(error);
    }
  }

  async function loadData(){
    try{
      const retorno = await AsyncStorage.getItem(  keyAsyncStorage  );   
      const teste = JSON.parse( retorno )
      console.log( teste );
      setUsers( teste || [] );
    }catch(error){
        Alert.alert("Erro na leitura dos dados");
    }
  }
    useEffect( ()=>{
      loadData();      
    } , []);

  return (

    <View style={GlobalStyle.container}>
      <AntDesign name="github" size={98} color={'#736AFF'} />  
      <Text style={styles.title}>GIT.Networking </Text>
      <Input placeholder="Adicione o nickname do usuário"  onChangeText={setNickname} 
       onPress={handleSearchUser} />

      <FlatList  data={users}  
          keyExtractor={item => item.id.toString()} 
          renderItem={ ({item}) =>  (
              <ItemGit avatar_url={item.avatar_url} name={item.login} onPress={ () => navigationDetails( item.login )}/>  
          ) }
      /> 
    </View>

  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 30,
    fontFamily: Theme.fonts.robotoBold,
    color: '#736AFF',
  },
})
