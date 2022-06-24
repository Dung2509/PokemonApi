import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import SortModal from './helper/SortModal';
const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth - 60;



export default function Header(props) {
  const {
    SortID,
    SortNameAZ,
    SortNameZA,
    normal,
    fighting,
    flying,
    poison,
    ground,
    rock,
    bug,
    ghost,
    steel,
    fire,
    water,
    grass,
    electric,
    psychic,
    ice,
    dragon,
    dark,
    fairy
  } = props;

  function ItemType({dataItem}) {
    return (
      <TouchableOpacity
        style={{
          width: itemWidth / 2.5,
          marginVertical: 10,
          marginHorizontal: 5,
          backgroundColor: dataItem.backgroundColor,
          flexDirection: 'column',
          height: 50,
          borderRadius: 20,
          justifyContent: 'center',
        }} onPress={dataItem.filter}>
        <Image
          style={{
            width: 40,
            height: 40,
            alignSelf: 'center',
          }}
          source={dataItem.img}
        />
      </TouchableOpacity>
    );
  }

  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

  const listNearMe = [
    {
      img: require('../assets/type/normal.png'),
      backgroundColor: '#9DA0AA',
      filter: normal,
    },
    {
      img: require('../assets/type/fighting.png'),
      backgroundColor: '#D04164',
      filter: fighting,
    },
    {
      img: require('../assets/type/flying.png'),
      backgroundColor: '#748FC9',
      filter:flying
    },
    {
      img: require('../assets/type/poison.png'),
      backgroundColor: '#A552CC',
      filter:poison
    },
    {
      img: require('../assets/type/ground.png'),
      backgroundColor: '#DD7748',
      filter:ground
    },
    {
      img: require('../assets/type/rock.png'),
      backgroundColor: '#B8A038',
      filter:rock
    },
    {
      img: require('../assets/type/bug.png'),
      backgroundColor: '#8CB230',
      filter:bug
    },
    {
      img: require('../assets/type/ghost.png'),
      backgroundColor: '#705898',
      filter:ghost
    },
    {
      img: require('../assets/type/steel.png'),
      backgroundColor: '#B8B8D0',
      filter:steel
    },
    {
      img: require('../assets/type/fire.png'),
      backgroundColor: '#FD7D24',
      filter:fire
    },
    {
      img: require('../assets/type/water.png'),
      backgroundColor: '#4A90DA',
      filter:water
    },
    {
      img: require('../assets/type/grass.png'),
      backgroundColor: '#62B957',
      filter:grass
    },
    {
      img: require('../assets/type/electric.png'),
      backgroundColor: '#EED535',
      filter:electric
    },
    {
      img: require('../assets/type/psychic.png'),
      backgroundColor: '#F85888',
      filter:psychic
    },
    {
      img: require('../assets/type/ice.png'),
      backgroundColor: '#98D8D8',
      filter:ice
    },
    {
      img: require('../assets/type/dragon.png'),
      backgroundColor: '#7038F8',
      filter:dragon
    },
    {
      img: require('../assets/type/dark.png'),
      backgroundColor: '#705848',
      filter:dark
    },
    {
      img: require('../assets/type/fairy.png'),
      backgroundColor: '#ED6EC7',
      filter:fairy
    },
  ]

  const renderItem = ({item, index}) => {
    return <ItemType dataItem={item} />;
  };

  return (
    <View
      style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 10}}>
      <TouchableOpacity style={{margin: 10}} onPress={SortID}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../assets/list.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{margin: 10}} onPress={() => setVisible(true)}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../assets/sort.png')}
        />
      </TouchableOpacity>
      <SortModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        SortAZ={SortNameAZ}
        SortZA={SortNameZA}
      />

      <TouchableOpacity style={{margin: 10}} onPress={() => setVisible2(true)}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../assets/filter.png')}
        />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={visible2}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              backgroundColor: 'lightgray',
              width: '80%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 10,
              alignSelf: 'center',
              height: Dimensions.get('screen').height - 70,
            }}>
            <FlatList
              style={{flexWrap: 'wrap'}}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              data={listNearMe}
              renderItem={renderItem}
            />
            <TouchableOpacity
              style={{
                width: itemWidth / 2.5,
                marginVertical: 10,
                marginHorizontal: 5,
                backgroundColor: 'gray',
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => setVisible2(!visible2)}>
              <Text
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
