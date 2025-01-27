import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

const LoginScreen = () => {

    const router=useRouter();

  return (
      <View>
        <View style={{
          display: 'flex',
          alignItems:'center',
          marginTop:40,
        }}>
          <Image source={require('./../../assets/images/login.png')} 
              style={styles?.image}
              />
        </View>
  
        <View style={{
              padding:25,
              backgroundColor:Colors.PRIMARY,
              height:'100%'
        }}>
          <Text style={{
            fontSize:30,
            fontWeight:'bold',
            color:'white',
            textAlign: 'center'
          }}>Stay on Track, Stay Healthy!</Text>

          <Text style={{
                color:'white',
                fontSize:17,
                marginTop:20,
                textAlign: 'center'
          }}>Track your meds, take control of your health. Stay consistent, stay confident.</Text>
        
          <TouchableOpacity style={styles?.button}
          onPress={()=>router.push('login/signIn')}>
            <Text style={{
                textAlign: 'center',
                fontSize:16,
                color:Colors.PRIMARY
            }}>Continue</Text>
          </TouchableOpacity>
            <Text style={{
                color:'white',
                marginTop:8,
                textAlign:'center'
            }}>Note: By clicking Continue button, you will agree to our terms and conditions</Text>

        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
      image:{
          width:210,
          height:450,
          borderRadius:23
      },
      button:{
        padding:15,
        backgroundColor:'white',
        borderRadius:99,
        marginTop:25
      }
  })

export default LoginScreen;