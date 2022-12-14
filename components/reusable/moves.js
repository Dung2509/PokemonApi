import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Dimensions} from 'react-native';
import styles from '../../assets/styles';
import {pokemonColors} from '../../store/action';

export default function Moves(props) {
  const {item} = props;

  const pokemonColor = pokemonColors[item.type];

  return (
    <ScrollView style={{height: Dimensions.get('screen').height + 650}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {item.moves.map((move, idx) => {
          return (
            <View
              key={idx}
              style={{
                backgroundColor: pokemonColor,
                borderRadius: 5,
                alignSelf: 'baseline',
                margin: 5,
                opacity: 0.5,
              }}>
              <Text style={{color: 'black', padding: 5, fontWeight: '700'}}>
                {move.move.name}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
