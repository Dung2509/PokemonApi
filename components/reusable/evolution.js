import { View, Text, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export default function Evolution(props) {
  const { item } = props;
  const [evolutions, setEvolutions] = React.useState();
  const position = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const opacity2 = React.useRef(new Animated.Value(0)).current;
  const [isLeft, setIsLeft] = useState(true);

  const position2 = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const opacity1 = React.useRef(new Animated.Value(1)).current;
  const opacity3 = React.useRef(new Animated.Value(0)).current;
  const [isLeft2, setIsLeft2] = useState(true);

  const fetchData = React.useCallback(async () => {
    const id = item.id;
    const specieRequest = await fetch(
      'https://pokeapi.co/api/v2/' + `pokemon-species/${id}`,
    );
    const specieData = await specieRequest.json();
    const chainRequest = await fetch(specieData.evolution_chain.url);
    const chainData = await chainRequest.json();

    const evoChain = [];
    let evoData = chainData.chain;


    evoChain.push({
      species_name: evoData.species.name,
      species_name1: evoData.evolves_to[0]?.species.name,
      species_name2: evoData.evolves_to[0]?.evolves_to[0]?.species.name,

      min_level: evoData.evolves_to[0]?.evolution_details[0]?.min_level,
      max_level: evoData.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.min_level,
      trigger_name: evoData.evolves_to[0]?.evolution_details[0]?.trigger.name,
      trigger_name2: evoData.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.trigger.name,
      // item_name: evoData.evolution_details[0]?.item?.name,
    });



    setEvolutions(evoChain);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  const runAnim = () => {
    const toValue = isLeft ? { x: 150, y: 150 } : { x: 0, y: 0 };
    const toValueOpacity = isLeft ? 0 : 1;
    const toValueOpacity2 = isLeft ? 1 : 0;
    Animated.sequence([
      Animated.timing(position, {
        toValue,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: toValueOpacity,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity2, {
        toValue: toValueOpacity2,
        duration: 2000,
        useNativeDriver: false,
      })
    ]).start(() => {
      setIsLeft(!isLeft);
    });
  };

  const runAnim2 = () => {
    const toValue = isLeft2 ? { x: 150, y: 150 } : { x: 0, y: 0 };
    const toValueOpacity = isLeft2 ? 0 : 1;
    const toValueOpacity2 = isLeft2 ? 1 : 0;
    Animated.sequence([
      Animated.timing(position2, {
        toValue,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity2, {
        toValue: toValueOpacity,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity3, {
        toValue: toValueOpacity2,
        duration: 2000,
        useNativeDriver: false,
      })
    ]).start(() => {
      setIsLeft2(!isLeft2);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        {evolutions?.map((data, index) => (

          <><Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold' }}>Level ({data.min_level})</Text>
            <View style={{ marginHorizontal: 20, width: Dimensions.get('screen').width - 40, flexDirection: 'row', justifyContent: 'space-between' }}>
              <AnimatedTouchable style={{ justifyContent: 'space-between', marginLeft: position.y, opacity: opacity }}
                onPress={runAnim}
              >
                <Animated.View style={{opacity:opacity}}>
                <View />
                <Image
                  style={{ width: 50, height: 50, alignSelf: 'center' }}
                  source={{
                    uri: 'https://img.pokemondb.net/artwork/large/' + data.species_name + '.jpg'
                  }} />
                <Text style={{ color: 'black' }}>{data.species_name.toUpperCase()}</Text>
                </Animated.View>
              </AnimatedTouchable>

              <Animated.View style={{ justifyContent: 'space-between',opacity:opacity2 }}>
                <Text>{data.trigger_name.toUpperCase()}</Text>
                <Image
                  style={{ width: 50, height: 50, alignSelf: 'center' }}
                  source={{
                    uri: 'https://img.pokemondb.net/artwork/large/' + data.species_name1 + '.jpg'
                  }} />
                <Text style={{ color: 'black' }}>{data.species_name1.toUpperCase()}</Text>
              </Animated.View>
            </View></>
        ))}
      </View>

      {evolutions?.map((data, index) => (
        <View style={{ marginTop: 20 }}>
          {
            data.species_name2 ? (<><Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold' }}>Level ({data.max_level})</Text>
            <View style={{ marginHorizontal: 20, width: Dimensions.get('screen').width - 40, flexDirection: 'row', justifyContent: 'space-between' }}>
            <AnimatedTouchable style={{ justifyContent: 'space-between', marginLeft: position2.y, opacity: opacity2 }}
                onPress={runAnim2}
              >
                <Animated.View style={{opacity:opacity2}}>
                <View />
                <Image
                  style={{ width: 50, height: 50, alignSelf: 'center' }}
                  source={{
                    uri: 'https://img.pokemondb.net/artwork/large/' + data.species_name1 + '.jpg'
                  }} />
                <Text style={{ color: 'black' }}>{data.species_name1.toUpperCase()}</Text>
                </Animated.View>
              </AnimatedTouchable>

              <Animated.View style={{ justifyContent: 'space-between',opacity:opacity3 }}>
                <Text>{data.trigger_name.toUpperCase()}</Text>
                <Image
                  style={{ width: 50, height: 50, alignSelf: 'center' }}
                  source={{
                    uri: 'https://img.pokemondb.net/artwork/large/' + data.species_name2 + '.jpg'
                  }} />
                <Text style={{ color: 'black' }}>{data.species_name2.toUpperCase()}</Text>
              </Animated.View>
            </View></>
            ) : (<Text style={{ alignSelf: 'center', fontSize:20}}>None</Text>)
          }


        </View>
      ))}
    </View>



  );
}
