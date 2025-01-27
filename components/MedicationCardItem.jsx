import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationCardItem({ medicine,selectedDate='' }) {
    console.log(medicine)
    const [status,setStatus]=useState();
    useEffect(()=>{
        CheckStatus();
    },[medicine])
    
    const CheckStatus = () => {
        if (Array.isArray(medicine?.action)) {
            const data = medicine?.action?.find((item) => item.date == selectedDate);
            console.log("--", data);
            setStatus(data);
        } else {
            setStatus(null);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: medicine?.type?.icon }}
                        style={{
                            width: 60,
                            height: 60,
                        }}

                    />
                </View>
                <View>
                    <Text style={{fontSize:22,fontWeight:'bold'}}>{medicine?.name}</Text>
                    <Text style={{fontSize:18}}>{medicine?.when}</Text>
                    <Text style={{fontSize:14}}>{medicine?.dose} {medicine?.type.name}</Text>
                </View>
            </View>
            <View style={styles.reminderContainer}>
                <Ionicons name="timer-outline" size={24} color="black" />   
                <Text style={{fontSize:16,fontWeight:'bold', marginTop:3}}>{medicine?.reminder}</Text>
            </View>
               
            {status?.date&& <View style={styles.statusContainer}>
                {status?.status=='Taken'?<Ionicons name="checkmark-circle-sharp"
                size={24} color={Colors.GREEN} />:
                status?.status=='Missed'&&
                <Ionicons name="close-circle"
                size={24} color='red' />}
            </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        padding: 13,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight:15
    },
    subContainer:{
        flexDirection:'row',
        alignItems:'center',
      
    },
    container:{
        padding:10,
        marginTop:10,
        //backgroundColor:Colors.LIGHT_GRAY,
        borderWidth:1,
        borderColor:Colors.LIGHT_GRAY_BORDER,
        marginTop:10,
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center'
    },
    reminderContainer:{
        padding:15,
        backgroundColor:'white',
        borderRadius:15,
        alignItems:'center',
        borderWidth:1,
        borderColor:Colors.LIGHT_GRAY_BORDER,
    },
    statusContainer:{
        position:'absolute',
        top:5,
        padding:7
    }
})

