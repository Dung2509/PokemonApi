import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Dimensions} from 'react-native';
import styles from '../../assets/styles';
import {pokemonColors, pokemonTypeColors} from '../../store/action';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function About(props) {
  const {item} = props;
  const [about, setAbout] = useState([]);
  const fetchData = React.useCallback(async () => {
    const specieRequest = await fetch(
      'https://pokeapi.co/api/v2/' + `pokemon-species/${item.id}`,
    );
    const specieData = await specieRequest.json();

    const aboutPkm = [];
    let desPokemon = specieData.flavor_text_entries;
    let speciesPkm = specieData.genera;
    let egg_group = specieData.egg_groups;
    aboutPkm.push({
      desPokemon: desPokemon[8].flavor_text,
      specie_name: speciesPkm[7].genus,
      egg: egg_group[0]?.name,
      egg1: egg_group[1]?.name,
    });

    setAbout(aboutPkm);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={{height: height + 400}}>
      {about.map((data, index) => (
        <Text key={index}
          style={{marginLeft: 40, width: width, fontSize: 15, marginBottom: 5}}>
          {data.desPokemon}
        </Text>
      ))}
      <Text
        style={{
          color: pokemonTypeColors[item.type],
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 40,
          marginBottom: 10,
        }}>
        Pokédex Data
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Species</Text>
        {about.map((data, index) => (
          <Text key={index} style={styles.about__text}>
            {data.specie_name}
          </Text>
        ))}
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Height</Text>
        <Text style={styles.about__text}>{item.height} ''</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Weight</Text>
        <Text style={styles.about__text}>{item.weight} lbs</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Abilities</Text>
        <View>
          <Text style={styles.about__text}>{item.ability1}</Text>
          <Text style={styles.about__text}>
            {item.ability2} (hidden ability)
          </Text>
        </View>
      </View>

      {/* Training */}
      <Text
        style={{
          color: pokemonTypeColors[item.type],
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 40,
        }}>
        Training
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Catch Rate</Text>
        <Text style={styles.about__text}>45 (5.9% with PokéBall, full HP)</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Base Friendship</Text>
        <Text style={styles.about__text}>70 (normal)</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Base Exp</Text>
        <Text style={styles.about__text}>{item.exp}</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Growth Rate</Text>
        <Text style={styles.about__text}>Medium Slow</Text>
      </View>

      {/* Breeding  */}
      <Text
        style={{
          color: pokemonTypeColors[item.type],
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 40,
        }}>
        Breeding
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Egg Groups</Text>
        {about.map((data, index) => (
          <Text key={index} style={styles.about__text}>
            {data.egg},{data.egg1}
          </Text>
        ))}
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Gender</Text>
        <Text style={styles.about__text}>♀ 87.5%, ♂ 12.5%</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>Egg Cycles</Text>
        <Text style={styles.about__text}>20 (4,884 - 5,140 steps)</Text>
      </View>

      {/* Location  */}
      <Text
        style={{
          color: pokemonTypeColors[item.type],
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 40,
        }}>
        Location
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>00{item.id}</Text>
        <Text style={styles.about__text}>(Red/Blue/Yellow)</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>{225 + item.id}</Text>
        <Text style={styles.about__text}>(Gold/Silver/Crystal)</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>00{item.id}</Text>
        <Text style={styles.about__text}>(FireRed/LeafGreen)</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>{230 + item.id}</Text>
        <Text style={styles.about__text}>(HeartGold/SoulSilver)</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>0{79 + item.id}</Text>
        <Text style={styles.about__text}>(X/Y - Central Kalos)</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={styles.about__title}>00{item.id}</Text>
        <Text style={styles.about__text}>
          (Let's Go Pikachu/Let's Go Eevee)
        </Text>
      </View>
    </ScrollView>
  );
}
