import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'

export default function SortModal(
    {
        isVisible,
        onClose,
        SortAZ,
        SortZA,
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
            <Pressable style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={SortAZ}>
                <Image style={{width:30, height:30, margin:10}} source={require('../../assets/sortAZ.png')}/>
                <Text style={{fontSize:14,fontWeight:'600'}}>Sort A - Z</Text>
            </Pressable>
            <Pressable style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={SortZA}>
                <Image style={{width:30, height:30, margin:10}} source={require('../../assets/sortZA.png')}/>
                <Text style={{fontSize:14,fontWeight:'600'}} >Sort Z - A</Text>
            </Pressable>
        </SafeAreaView>
    </Modal>
  )
}

