import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router';
import {auth} from './../../config/FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setLocalStorage } from '../../service/Storage';

export default function SignUp() {

    const router=useRouter();

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [userName,setUserName]=useState();

    const OnCreateAccount = () => {
        if (!email || !password||!userName) 
        {
          const message = 'Please fill all details';
      
          if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.BOTTOM);
          } else {
            Alert.alert(
              'Warning', // Nadpis
              message,   // Správa
              [{ text: 'OK' }] // Tlačidlo
            );
          }
          return;
        }
    
        
createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    
    await updateProfile(user,{
        displayName:userName
    })

    await setLocalStorage('userDetail',user);

    router.push('(tabs)')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
    console.log('Error Code:', errorCode);
    console.log('Error Message:', errorMessage);
  
    if (errorCode === 'auth/email-already-in-use') {
      Alert.alert(
        'Error', // Nadpis
        'Email already exists.', // Správa
        [
          { text: 'OK', onPress: () => console.log('User acknowledged the error') }, // Tlačidlo
        ],
        { cancelable: true } // Možnosť zatvoriť Alert kliknutím mimo
      );
    } 
  });
}

  return (
   <View style={{
           padding:30
       }}>
         <Text style={styles.textHeader}>Create New Account</Text>
       
       <View style={{
           marginTop:25
       }}>
           <Text>Full Name</Text>
           <TextInput placeholder='Full Name' 
           onChangeText={(value)=>setUserName(value)}
           style={styles.textInput} />
       </View>

       <View style={{
           marginTop:25
       }}>
           <Text>Email</Text>
           <TextInput placeholder='Email' style={styles.textInput} 
           onChangeText={(value)=>setEmail(value)}

           />
       </View>
   
       <View style={{
           marginTop:25
       }}>
           <Text>Password</Text>
           <TextInput placeholder='Password' 
           secureTextEntry={true}
           style={styles.textInput} 
           onChangeText={(value)=>setPassword(value)}
           />
       </View>
   
       <TouchableOpacity style={styles.button}
       onPress={OnCreateAccount}
       >
           <Text style={{
               fontSize:17,
               color:'white',
               textAlign:'center'
           }}>Create Account</Text>
       </TouchableOpacity>
   
       <TouchableOpacity style={styles.buttonCreate}
           onPress={()=>router.push('login/signIn')}>
           <Text style={{
               fontSize:17,
               color:Colors.PRIMARY,
               textAlign:'center'
           }}>Already have an account? Sign In</Text>
       </TouchableOpacity>
       </View>
     )
    }
   
   const styles = StyleSheet.create({
       textHeader:{
           fontSize:30,
           fontWeight:'bold',
           marginTop:50
       },
       subText:{
           fontSize:30,
           fontWeight:'bold',
           marginTop:10,
           color:Colors.GRAY
       },
       textInput:{
           padding:10,
           borderWidth:1,
           fontSize:17,
           borderRadius:10,
           marginTop:5,
           backgroundColor:'white'
       },
       button:{
           padding:20,
           backgroundColor:Colors.PRIMARY,
           borderRadius:10,
           marginTop:35
       },
       buttonCreate:{
           padding:20,
           backgroundColor:'white',
           borderRadius:10,
           marginTop:20,
           borderWidth:1,
           borderColor:Colors.PRIMARY
       }
  })