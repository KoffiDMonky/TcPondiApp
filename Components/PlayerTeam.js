import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default PlayerTeam = props => {
  const joueur1 = props.joueur1;
  const joueur2 = props.joueur2;
  const score1 = props.score1;
  const score2 = props.score2;
  const score3 = props.score3;
  const result = props.result;

  return (
    <View style={styles.container}>
      <View style={styles.containerPlayers}>
        <View style={styles.containerPlayer}>
          <Text style={styles.player(result)}>
            {joueur1.nom} {joueur1.prenom}
          </Text>
          <Text style={styles.classement(result)}>{joueur1.classement}</Text>
        </View>
        {joueur2 && (
          <View style={styles.containerPlayer}>
            <Text style={styles.player(result)}>
              {joueur2.nom} {joueur2.prenom}
            </Text>
            <Text style={styles.classement(result)}>{joueur2.classement}</Text>
          </View>
        )}
      </View>
      <View style={styles.score}>
        <Text style={styles.textScore(result)}>{score1}</Text>
        <Text style={styles.textScore(result)}>{score2}</Text>
        {score3 && <Text style={styles.textScore(result)}>{score3}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  containerPlayers: {
    flex: 5,
    flexDirection: 'column',
    width: '100%',
    padding: 5,
  },
  containerPlayer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  player: result => ({
    flex: 5,
    textAlign: 'right',
    marginRight: 5,
    fontWeight: result ? '800' : '400',
    color: result ? '#8ABC30' : Colors.darker
  }),
  classement:result => ( {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: result ? '800' : '400',
    color: result ? '#8ABC30' : Colors.darker
  }),
  score: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textScore: result => ( {
    padding: 5,
    fontWeight: result ? '800' : '400',
    color: result ? '#8ABC30' : Colors.darker
  }),
  date: modal => ({
    marginTop: modal ? 0 : 25,
    marginBottom: modal ? 0 : 5,
    fontSize: 18,
    fontWeight: modal ? '400' : '600',
    textAlign: 'center',
    color: Colors.darker,
  }),
});
