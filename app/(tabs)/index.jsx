import React, { useState } from 'react';
import { View, Text, Button, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../config/FirebaseConfig';
import { signOut } from 'firebase/auth';
import Header from '../../components/Header';
import MedicationList from '../../components/MedicationList';

const HomeScreen = () => {
  
  const router = useRouter();
  
  const handleRedirect = () => {
    router.push('/login');
  };

  return (
    <FlatList
    data={[]}
    ListHeaderComponent={
    <ScrollView style={{
      padding:25,
      backgroundColor:'white',
      height:'100%'
    }}>
     <Header/>
     <MedicationList/>
    </ScrollView>}
    />
  );
};

export default HomeScreen;
