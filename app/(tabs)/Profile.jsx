import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getLocalStorage, removeLocalStorage } from '../../service/Storage';
import Colors from '../../constant/Colors';
import { auth } from '../../config/FirebaseConfig';
import { signOut } from 'firebase/auth';

export default function Profile() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage('userDetail');
    console.log(userInfo);
    setUser(userInfo);
  };

  const handleLogout = async () => {
    // Vymazanie údajov používateľa z lokálneho úložiska
    await removeLocalStorage('userDetail');
    // Presmerovanie na prihlasovaciu obrazovku
    router.push('/login'); // Zmeň cestu podľa tvojej prihlasovacej obrazovky
  };

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop:'50%'
      }}
    >
      <Image
        source={require('./../../assets/images/smiley.png')}
        style={{
          width: 80,
          height: 80,
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: 'bold',
        }}
      >{user?.displayName}
      </Text>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        {user?.email}
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 30,
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor:Colors.PRIMARY,
          borderRadius: 10
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize:20
          }}
        >Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
