import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../service/Storage'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';

export default function Header() {

    const [user,setUser]=useState();
    const router=useRouter();
    useEffect(()=>{
        GetUserDetail();
    },[])

    const GetUserDetail=async()=>{
        const userInfo=await getLocalStorage('userDetail');
        console.log(userInfo);
        setUser(userInfo);
    }

  return (
    <View style={{
        marginTop:25
    }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%'
        }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
      }}>
        <Image source={require('./../assets/images/smiley.png')}
            style={{
                width:45,
                height:45
            }}
        />
        <Text style={{
            fontSize:20,
            fontWeight:'bold'
        }}>Hello {user?.displayName} 👋</Text>   
         </View>
         <TouchableOpacity onPress={()=>router.push('/add-new-medication')}>
         <FontAwesome5 name="briefcase-medical" size={30} color={Colors.PRIMARY} />
         </TouchableOpacity>
      </View>
    </View>
  )
}