import React, {useState} from 'react';
import {Text, View} from 'react-native';

export default Ranking = props => {
  //lignes du tableau contenant le classement
  const teamsRanking = props.teamsRanking;

  return (
    <View style={{flex: 1, padding: 12, width: '90%'}}>
      <View
        style={{flexDirection: 'row', borderBottomWidth: 2, paddingVertical: 12}}>
        <Text style={{flex: 1}}>N°</Text>
        <Text style={{flex: 3}}>Equipe</Text>
        <Text style={{flex: 1}}>Points</Text>
      </View>
      {teamsRanking}
    </View>
  );
};
