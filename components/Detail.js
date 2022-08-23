import React, { useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../assets/styles";
import { pokemonColors } from "../store/action";
import About from "./reusable/about";
import Stats from "./reusable/baseStats";
import Moves from "./reusable/moves";
import { pokemonTypeColors } from "../store/action";
import { pokemonTypes } from "../store/pokemonType";
import Evolution from "./reusable/evolution";
export default function Detail({ navigation, route }) {
    const item = route.params
    const [menu, setMenu] = useState("About")

    const pokemonColor = pokemonColors[item.type];
    const bgStyles = { ...styles.container, backgroundColor: pokemonColor };

    const listMenuInfo = [
        {
            option: "About"
        },
        {
            option: "Base Stats"
        },
        {
            option: "Moves"
        },
        {
            option: "Evolutions"
        },
    ]

    const setMenuOption = menu => {
        return setMenu(menu)
    }

    const btnActive = {
        color: pokemonColor,
    }

    return (
        <View style={bgStyles}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={() => navigation.goBack()}>
                <Image style={{alignSelf:'center'}} source={require('../assets/back.png')}/>
                </TouchableOpacity>
            
            <Text style={styles.text__titleDetail}>{item.name}</Text>
            <View/>
            </View>
           
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 20, marginRight: 30 }}>
                    {item.types ?
                        item.types.map((type, idx) => {
                            return (
                                <View 
                                    key={idx} 
                                    style={{ 
                                        backgroundColor: pokemonTypeColors[type.type.name],  
                                        borderRadius: 10, 
                                        alignSelf: "baseline", 
                                        margin: 5,
                                        flexDirection: "row",
                                        padding:5,
                                        opacity:0.8,
                                       
                                    }}>
                                    <Image style={{alignSelf:'center', marginLeft:5}} source={ pokemonTypes[type.type.name] }/>
                                    <Text 
                                        style={{ 
                                            color: "white",
                                            textTransform:'capitalize', 
                                            padding: 5, 
                                            opacity: 1, 
                                            fontWeight: "bold", 
                                            fontSize: 15, 
                                            marginLeft: 5, 
                                            marginRight: 10 
                                        }}>{type.type.name}</Text>
                                </View>
                            )
                        })
                        : <View></View>}

                </View>
                <View style={{ paddingRight: 20 }}>
                    <Text style={{ color: "#fff", opacity: .8, fontWeight: "bold", fontSize: 20, }}>
                        #{`${item.id}`.padStart(3, 0)}
                    </Text>
                </View>
            </View>
            <View style={{
                alignItems: "center",
                elevation: 5,
            }}>
                <Image
                    style={{width: 150, height:150}}
                    source={{ uri: item.imgUrl }}
                />
            </View>
            <View style={styles.container__moves}>
                <SafeAreaView style={{}}>
                    <View style={styles.detail__listTab}>
                        {
                            listMenuInfo.map(e => {
                                return (
                                    <TouchableOpacity key={e.option} style={[styles.detail__btnTab, menu === e.option && { borderBottomWidth: 1, borderBottomColor: pokemonColor }]}
                                        onPress={() => setMenuOption(e.option)}
                                    >
                                        <Text style={[styles.detail__textTab, menu === e.option && btnActive]}>{e.option}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <ScrollView>
                        <View style={{}}>
                            {menu === 'Moves' ?
                                <Moves item={item}></Moves> : <View></View>
                            }

                            {menu === "About" ?
                                <About item={item}></About> : <View></View>
                            }

                            {menu === "Base Stats" ?
                                <Stats item={item}></Stats> : <View></View>
                            }
                             {menu === "Evolutions" ?
                                <Evolution item={item}></Evolution> : <View></View>
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    )
}