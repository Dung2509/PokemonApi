import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles';
import { fetchPokemons } from '../store/action';
import PokemonCard from './reusable/card';
import { name } from '../node_modules/prettier/parser-espree';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerModal from './ImagePickerModal';
import ImagePickerAvatar from './ImagePickerAvavtar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from './Header';
const width = Dimensions.get('screen').width;
export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons);

  const loading = useSelector(state => state.loading);
  const next = useSelector(state => state.next);
  const [isLoading, setIsLoading] = useState(false);

  const [listPokemon, setListPokemon] = useState(pokemons);
  const [isFocus, setIsFocus] = useState(false);
  const image = require('../assets/type/pokeballIcon.png');
  const [pickerResponse, setPickerResponse] = useState(image);
  const [visible, setVisible] = useState(false);

  const onCameraPress = () => {
    const options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'images',
      },
      includeBase64: true,
    };
    launchCamera(options, res => {
      console.log('res' + res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('Error' + res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button' + res.customButton);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + res.assets[0].base64 };
        setPickerResponse(source);
      }
    });
  };

  const onLibrary = () => {
    const options = {
      mediaType: 'photo',
      path: 'images',
    };
    launchImageLibrary(options, res => {
      console.log('res' + res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('Error' + res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button' + res.customButton);
      } else {
        const source = res.assets[0];
        setPickerResponse(source);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchPokemons(next));
  }, []);

  const loadPokemon = () => {
    setIsLoading(true);
    dispatch(fetchPokemons(next));
    setIsLoading(false);
  };

  const handleSearch = query => {
    if (query && pokemons) {
      const matches = pokemons?.filter(
        ({ id, name }) =>
          id.toString() === query ||
          name.toLowerCase().includes(query.toLowerCase()),
      );

      if (matches) {
        setListPokemon(matches);
      }
    } else {
      setListPokemon(pokemons);
    }
  };

  const SortPokemon = (count) => {
    if (count === 0) {
      const sort = pokemons.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setListPokemon(sort);
      setIsFocus(true)
    }
    else if (count === 1) {
      const sort1 = pokemons.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setListPokemon(sort1);
      setIsFocus(true)
    }else if(count === 2){
      const sortID = pokemons.sort(function(a,b) {
        if(a.id < b.id){
          return -1
        }
        if(a.id> b.id){
          return 1
        }return 0
      })
      setListPokemon(sortID)
      setIsFocus(true)
    }
     else {
      setListPokemon(pokemons);

    }
  };

  const Filtertype = (count) => {
    if (count === 1) {
      const matches = pokemons.filter(({ type }) => type === 'normal');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 2) {
      const matches = pokemons.filter(({ type }) => type === 'fighting');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 3) {
      const matches = pokemons.filter(({ type }) => type === 'flying');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 4) {
      const matches = pokemons.filter(({ type }) => type === 'poison');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 5) {
      const matches = pokemons.filter(({ type }) => type === 'ground');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 6) {
      const matches = pokemons.filter(({ type }) => type === 'rock');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 7) {
      const matches = pokemons.filter(({ type }) => type === 'bug');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 8) {
      const matches = pokemons.filter(({ type }) => type === 'ghost');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 9) {
      const matches = pokemons.filter(({ type }) => type === 'steel');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 10) {
      const matches = pokemons.filter(({ type }) => type === 'fire');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 11) {
      const matches = pokemons.filter(({ type }) => type === 'water');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 12) {
      const matches = pokemons.filter(({ type }) => type === 'grass');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 13) {
      const matches = pokemons.filter(({ type }) => type === 'electric');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 14) {
      const matches = pokemons.filter(({ type }) => type === 'psychic');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 15) {
      const matches = pokemons.filter(({ type }) => type === 'ice');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 16) {
      const matches = pokemons.filter(({ type }) => type === 'dragon');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 17) {
      const matches = pokemons.filter(({ type }) => type === 'dark');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }
    if (count === 18) {
      const matches = pokemons.filter(({ type }) => type === 'fairy');

      if (matches) {
        setIsFocus(true)
        setListPokemon(matches);
      }
    }

    if (count === 0) {
      setIsFocus(false)
      setListPokemon(pokemons)
    }
  };

  return (
    <View style={styles.container}>
      <Header
        SortID={() => SortPokemon(2)}
        SortNameAZ={() => SortPokemon(0)}
        SortNameZA={() => SortPokemon(1)}
        normal={() => Filtertype(1)}
        fighting={() => Filtertype(2)}
        flying={() => Filtertype(3)}
        poison={() => Filtertype(4)}
        ground={() => Filtertype(5)}
        rock={() => Filtertype(6)}
        bug={() => Filtertype(7)}
        ghost={() => Filtertype(8)}
        steel={() => Filtertype(9)}
        fire={() => Filtertype(10)}
        water={() => Filtertype(11)}
        grass={() => Filtertype(12)}
        electric={() => Filtertype(13)}
        psychic={() => Filtertype(14)}
        ice={() => Filtertype(15)}
        dragon={() => Filtertype(16)}
        dark={() => Filtertype(17)}
        fairy={() => Filtertype(18)}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text onPress={() => Filtertype(0)} style={styles.text__title}>
            Pokédex
          </Text>
          <Text style={{ width: width - 120, marginBottom: 10, marginLeft: 10 }}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>
        </View>
        <ImagePickerAvatar
          uri={pickerResponse}
          onPress={() => setVisible(true)}
        />
        <ImagePickerModal
          isVisible={visible}
          onClose={() => setVisible(false)}
          onImageLibraryPress={onLibrary}
          onCameraPress={() => onCameraPress()}
        />
      </View>
      <TextInput
        placeholder={'What Pokémon are you looking for?'}
        style={styles.input}
        onFocus={() => setIsFocus(true)}
        onChangeText={handleSearch}
      />

      <FlatList
        data={isFocus ? listPokemon : pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={pokemon => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
      // onEndReached={() => dispatch(fetchPokemons(next))}
      />

      {!loading ? (
        <View style={{ padding: 5, marginTop: 10 }}>
          <Button title="Show More" color={'gray'} onPress={loadPokemon} />
        </View>
      ) : <ActivityIndicator size={'large'} />}
    </View>
  );
}
