import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default Ranking = props => {
  //lignes du tableau contenant le classement
  const teamsRanking = props.teamsRanking;

  return (
    <View style={{flex: 1, padding: 1, width: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderBottomColor: Colors.lighter,
          paddingVertical: 12,
        }}>
        <Text style={[{flex: 1}, styles.textBold]}>N°</Text>
        <Text style={[{flex: 3}, styles.textBold]}>Equipe</Text>
        <Text style={[{flex: 1}, styles.textBold]}>Points</Text>
      </View>
      {teamsRanking}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: Colors.darker,
    fontSize: 15,
    marginLeft: 5,
  },
  textBold: {
    textAlign: 'center',
    color: Colors.darker,
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '600',
  },
});
