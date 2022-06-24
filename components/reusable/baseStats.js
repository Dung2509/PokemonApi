import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Dimensions, Image} from 'react-native';
import styles from '../../assets/styles';
import {ProgressBar, Colors} from 'react-native-paper';
import {pokemonColors, pokemonTypeColors} from '../../store/action';
import {pokemonTypes} from '../../store/pokemonType';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function Stats(props) {
  const {item} = props;
  const [baseStats, setBaseStats] = useState([]);

  const fetchData = React.useCallback(async () => {
    const types = item.type;
    // console.log(types);
    const specieRequest = await fetch(
      'https://pokeapi.co/api/v2/type/' + types,
    );
    const specieData = await specieRequest.json();

    const baseStat = [];
    let desPokemon = specieData.damage_relations;
    let numOfType = desPokemon.double_damage_from.length;
    // baseStat.push({
    //     ddf: desPokemon.double_damage_from[0].name
    // })
    if (numOfType > 1) {
      for (let i = 0; i < numOfType; i++) {
        baseStat.push({
          ddf: desPokemon.double_damage_from[i]?.name,
          ddt: desPokemon.double_damage_to[i]?.name,
          hdf: desPokemon.half_damage_from[i]?.name,
          hdt: desPokemon.half_damage_to[i]?.name
        });
      }
    }

    setBaseStats(baseStat);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={{height: height + 10}}>
      <Text
        style={{
          color: pokemonTypeColors[item.type],
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 40,
          marginBottom: 10,
        }}>
        Base Stats
      </Text>
      {item.stats.map((stat, idx) => {
        return (
          <View key={idx} style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={styles.stats__title}>
              {stat.stat.name[0].toUpperCase() + stat.stat.name.substring(1)}
            </Text>
            <Text style={styles.stats__text}>{stat.base_stat}</Text>
            <View
              style={{
                width: 130,
                alignContent: 'center',
                paddingTop: 10,
                height: 20,
              }}>
              <ProgressBar
                style={{height: 5}}
                progress={stat.base_stat / 100}
                color={pokemonColors[item.type]}
              />
            </View>
          </View>
        );
      })}

      <Text style={{marginLeft: 40, width: width - 60}}>
        The ranges shown on the right are for a level 100 Pokémon. Maximum
        values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values
        are based on a hindering nature, 0 EVs, 0 IVs.
      </Text>
      <Text
        style={{
          color: pokemonTypeColors[item.type],
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 40,
          marginVertical: 10,
        }}>
        Type Defenses
      </Text>
      <Text style={{marginLeft: 40}}>
        The effectiveness of each type on {item.name}.
      </Text>
     
        <Text style={{marginLeft:40,fontSize:17,color:pokemonColors[item.type],fontWeight:'bold'}}>Weak vs.</Text>
        <View style={{flexDirection:'row',marginLeft:40}}>
        <Text style={{alignSelf:'center',fontSize:15}}>Double Damage From :  </Text> 
        {baseStats.map((data, index) => (                     
            <View style={{ backgroundColor:pokemonTypeColors[data.ddt],justifyContent:'center',margin:5}}>
            <Image style={{alignSelf:'center'}} source={pokemonTypes[data.ddt]} />
            </View>            
      
        ))}    
        </View>

        <View style={{flexDirection:'row',marginLeft:40}}>
        <Text style={{alignSelf:'center'}}>Half Damage To :  </Text> 
        {baseStats.map((data, index) => (                     
            <View style={{ backgroundColor:pokemonTypeColors[data.hdf],justifyContent:'center',margin:5}}>
            <Image style={{alignSelf:'center'}} source={pokemonTypes[data.hdf]} />
            </View>            
      
        ))}    
        </View>

        <Text style={{marginLeft:40,fontSize:17,color:pokemonColors[item.type],fontWeight:'bold'}}>Strong vs.</Text>
        <View style={{flexDirection:'row',marginLeft:40}}>
        <Text style={{alignSelf:'center',fontSize:15}}>Double Damage To :  </Text> 
        {baseStats.map((data, index) => (                     
            <View style={{ backgroundColor:pokemonTypeColors[data.ddf],justifyContent:'center',margin:5}}>
            <Image style={{alignSelf:'center'}} source={pokemonTypes[data.ddf]} />
            </View>            
      
        ))}    
        </View>

        <View style={{flexDirection:'row',marginLeft:40}}>
        <Text style={{alignSelf:'center',fontSize:15}}>Half Damage From :  </Text> 
        {baseStats.map((data, index) => (                     
            <View style={{ backgroundColor:pokemonTypeColors[data.hdt],justifyContent:'center',margin:5}}>
            <Image style={{alignSelf:'center'}} source={pokemonTypes[data.hdt]} />
            </View>            
      
        ))}    
        </View>
   
    </ScrollView>
  );
}
