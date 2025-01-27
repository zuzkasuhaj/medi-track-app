import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import { TypeList, WhenToTake } from './../constant/Options';
import { doc, setDoc } from "firebase/firestore"; 
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, formatDateForText, formatTime, getDatesRange } from '../service/ConvertDateTime';
import { db } from '../config/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddMedicationForm() {
  const [formData, setFormData] = useState({ reminder: null });
  const [showStartDate,setShowStartDate]=useState(false);
  const [showEndDate,setShowEndDate]=useState(false);
  const [showTimePicker,setShowTimePicker]=useState(false);
  const [loading, setLoading]=useState(false);
  const router=useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]:value,
    }));

    console.log(formData);
  };

  const getLocalStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Error reading local storage:', e);
      return null;
    }
  };

  const SaveMedication=async()=>{
    const docId=Date.now().toString();
    const user=await getLocalStorage('userDetail');
    if(!(formData?.name||formData?.type||formData?.dose||formData?.startDate||formData?.endDate||formData?.reminder))
    {
      Alert.alert('Enter all fields');
      return;
    }
    const dates=getDatesRange(formData?.startDate,formData?.endDate);
    console.log(dates);
    setLoading(true);

    try{
      await setDoc(doc(db,'medication',docId),{
        ...formData,
        userEmail:user?.email,
        docId:docId,
        dates:dates
      });

      console.log('Date Saved!')
      setLoading(false);
      Alert.alert('Great','New medication added succesfully',[
      {
        text:'OK',
        onPress:()=>router.push('(tabs)')
      }
    ])
    }catch(e)
    {
      setLoading(false);
      console.log(e)
    }
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="medkit-outline" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal
        style={{ marginTop: 1 
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => (
          <TouchableOpacity
            style={[styles.inputGroup, { marginRight: 5 },
                {backgroundColor:item.name==formData?.type?.name?Colors.PRIMARY:'white'}
            ]}
            onPress={() => onHandleInputChange('type', item)}>
            <Text style={[styles.typeText,
                {color:item.name==formData?.type?.name?'white':'black'}
            ]}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        // keyExtractor={(item, index) => index.toString()}
      />

        {/* Dose Input */}
        <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="eyedrop-outline" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="Dose Ex. 2 , 5ml"
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

        {/*When To Take Dropdown */}

        <View style={styles.inputGroup}>
         <Ionicons style={styles.icon} name="time-outline" size={24} color="black" />
         <Picker
                selectedValue={formData?.when}
                onValueChange={(itemValue,itemIndex)=>
                    onHandleInputChange('when',itemValue)
                }
                
                style={{
                    width:'90%',
                }}
            >
                {WhenToTake.map((item,index)=>(
                    <Picker.Item key={index} label={item} value={item} />
                ))}
            </Picker>
        </View>

        {/* Start and End Date */}
        <View style={styles.dateInputGroup}>
            <TouchableOpacity style={[styles.inputGroup,{flex:1}]}
                onPress={()=>setShowStartDate(true)}
            >
                <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
                <Text style={styles.text}>{formatDateForText(formData?.startDate)??'Start Date'}</Text>
                
            </TouchableOpacity>
            {showStartDate && (
            <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                if (event.type === "set") { // Skontroluj, či užívateľ vybral dátum
                    const selectedDate = event.nativeEvent.timestamp;
                    onHandleInputChange("startDate", new Date(selectedDate));
                }
                setShowStartDate(false);
                }}
                value={formData?.startDate ? new Date(formData.startDate) : new Date()}
            />
            )}
            <TouchableOpacity style={[styles.inputGroup,{flex:1}]}
                onPress={()=>setShowEndDate(true)}
                >
                <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
                <Text style={styles.text}>{formatDateForText(formData?.endDate)??'End Date'}</Text>
           
            </TouchableOpacity>
            {showEndDate &&(
            <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                if (event.type === "set") { // Skontroluj, či užívateľ vybral dátum
                    const selectedDate = event.nativeEvent.timestamp;
                    onHandleInputChange("endDate", new Date(selectedDate));
                }
                setShowEndDate(false);
                }}
                value={formData?.endDate ? new Date(formData.endDate) : new Date()}
            />
            )}
        </View>

        {/* Set Reminder Input */}

        <View style={styles.dateInputGroup}>
            <TouchableOpacity style={[styles.inputGroup,{flex:1}]}
                onPress={()=>setShowTimePicker(true)}
            >
                <Ionicons style={styles.icon} name="timer-outline" size={24} color="black" />
                <Text style={styles.textReminder}>{formData.reminder ? `Reminder Time: ${formData.reminder}` : "Select Reminder Time"}</Text>
                
            </TouchableOpacity>
        </View>
        
        {showTimePicker && (
            <RNDateTimePicker
              mode="time"
              onChange={(event, selectedTime) => {
                if (event.type === "set" && selectedTime) {
                  onHandleInputChange("reminder", formatTime(new Date(selectedTime)));
                }
                setShowTimePicker(false); // Hide picker
              }}
              value={new Date()}
            />
          )}

        <TouchableOpacity style={styles.button}
         onPress={()=>SaveMedication()}
        >
          {loading? <ActivityIndicator size={'large'} color={'white'}/>:
          <Text style={styles.buttonText}>
            Add New Medication</Text>}
        
        </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 5,
    backgroundColor:'white'
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 15,
    borderColor: Colors.GRAY_BORDER,
  },
  typeText: {
    fontSize: 15,
  },
  text:{
    fontSize:14,
    padding:10,
    flex:1,
    marginLeft:10
  },
  textReminder:{
    fontSize:15,
    padding:10,
    flex:1,
    marginLeft:10
  },
  dateInputGroup:{
    flexDirection:'row',
    gap:5
  },
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderRadius:18,
    width:'100%',
    marginTop:6
  },
  buttonText:{
    fontSize:16,
    color:'white',
    textAlign:'center'
  }
});
