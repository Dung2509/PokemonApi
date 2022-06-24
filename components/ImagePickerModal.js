import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'

export default function ImagePickerModal(
    {
        isVisible,
        onClose,
        onImageLibraryPress,
        onCameraPress,
    }
) 
{
  return (
    <Modal
        isVisible={isVisible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={{justifyContent:'flex-end', margin:0}}    
    >
        <SafeAreaView style={{backgroundColor:'white', flexDirection:'row', borderTopRightRadius:30, borderTopLeftRadius:30}}>
            <Pressable style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={onImageLibraryPress}>
                <Image style={{width:30, height:30, margin:10}} source={require('../assets/type/pictures.png')}/>
                <Text style={{fontSize:14,fontWeight:'600'}}>Library</Text>
            </Pressable>
            <Pressable style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={onCameraPress}>
                <Image style={{width:30, height:30, margin:10}} source={require('../assets/type/photo-camera-interface-symbol-for-button.png')}/>
                <Text style={{fontSize:14,fontWeight:'600'}} >Camera</Text>
            </Pressable>
        </SafeAreaView>
    </Modal>
  )
}

