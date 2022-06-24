import { View, Text, TouchableOpacity,Image,ImageBackground } from 'react-native'
import React from 'react'
import Icon from '../assets/type/fire.png'

export default function ImagePickerAvatar({uri, onPress}) {
  return (
        <View style={{alignItems:'center'}}>
           
            <TouchableOpacity style={{width: 70, height: 70, borderRadius: 50, margin:5}} onPress={onPress}>
            {/* <Image style={{width:30, height:30}}source={require('../assets/type/pokeballIcon.png')}/> */}
                <Image style={{width:70, height:70,borderRadius: 50}} source={uri}/>
                {/* <View style={{width: 100, height: 100, borderRadius: 50,backgroundColor:'gray'}}></View> */}
            </TouchableOpacity>
            {/* <Text style={{fontSize:15, fontWeight:'600'}}>Upload Profile Image</Text> */}
        </View>
  )
}