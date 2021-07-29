import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import Theme from '../styles/Theme';
import api from '../services/api';
import {FontAwesome5} from '@expo/vector-icons'; 
import {MaterialCommunityIcons} from '@expo/vector-icons'; 

export function Details({ route }) {
  
  const [user, setUser] = useState({});

  async function carregarUsuarios( nickname ){
    try {
      response = await api.get('/users/' + nickname);
      const {data} = response;

      const obj = {
        id: data.id,
        name: data.name,
        login: data.login,
        company: data.company,
        bio: data.bio,
        avatar_url: data.avatar_url,
        url: data.url,
        followers: data.followers,
        public_repos: data.public_repos,
      }

      setUser(obj);
      console.log(obj);

    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(()=>{
      const { user } = route.params;
      carregarUsuarios( user );
    
  },[]);

  return (
    <View style={GlobalStyle.container}>
         <View style={styles.perfil}>
            <Image style={styles.photo} source={{uri: user.avatar_url }}/>
            <Text style={ styles.title }>{ user.name}</Text> 
            <Text style={styles.textPerfil }>{ user.url}</Text>
            {user.company  && <Text style={styles.textRegular}>Empresa: {user.company}</Text> }
            <Text style={styles.textRegular}>Bio: {user.bio}</Text> 

         </View>

         <View style={styles.info}> 
            <View >
              <Text style={styles.titleInfo}>Repositórios</Text>
              <View style={ styles.infoCount }>
                <MaterialCommunityIcons name="source-repository" size={50} color="black" />
                <Text style={ styles.textCount}>{ user.public_repos }</Text>
              </View>  
            </View>

            
            <View>
              <Text style={styles.titleInfo}>Seguidores</Text>
              <View style={ styles.infoCount }>
                <FontAwesome5 name="users" size={40} color="black" />
                <Text style={ styles.textCount}>{ user.followers }</Text>
              </View>
            </View>
         </View>
        
        <View>
          <TouchableOpacity style= {styles.buttonRemove}>
            <Text style={styles.textButton}> Remover </Text>
          </TouchableOpacity> 
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  perfil:{
    alignItems:'center',
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius:90,
  },
  title:{
    fontSize: 30,
    color: '#736AFF',
    fontFamily: Theme.fonts.robotoBold,
  },
  info:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:70,
    width: '75%',
  },
  titleInfo:{
    fontSize:20,
    fontFamily: Theme.fonts.rebotoRegular,
  },
  infoCount:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textCount:{
    fontSize: 25,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.black
  },
  textPerfil:{
    fontSize: 15,
    fontFamily: Theme.fonts.rebotoRegular,
    color: Theme.colors.gray,
  },
  textRegular:{
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: Theme.colors.gray,
    fontFamily: Theme.fonts.rebotoRegular,
  },
  buttonRemove: {
    height: 50,
    width: 210,
    margin: 30,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor:'#736AFF',
    borderRadius: 18,
  },
  textButton: {
    fontSize: 20,
    color: "white",
  }

})

