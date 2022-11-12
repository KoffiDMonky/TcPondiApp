import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default PlayerTeam = props => {
  const joueur1 = props.joueur1;
  const joueur2 = props.joueur2;
  const score1 = props.score1;
  const score2 = props.score2;
  const result = props.result;

  return (
    <View style={styles.container}>
      <View style={styles.containerPlayers}>
        <View style={styles.containerPlayer}>
          <Text style={styles.player}>
            {joueur1.nom} {joueur1.prenom}
          </Text>
          <Text style={styles.classement}>{joueur1.classement}</Text>
        </View>
        {joueur2 && (
          <View style={styles.containerPlayer}>
            <Text style={styles.player}>
              {joueur2.nom} {joueur2.prenom}
            </Text>
            <Text style={styles.classement}>{joueur2.classement}</Text>
          </View>
        )}
      </View>
      <View style={styles.score}>
        <Text style={styles.textScore}>{score1}</Text>
        <Text style={styles.textScore}>{score2}</Text>
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
  },
  player: {
    flex: 5,
    textAlign: 'right',
    marginRight: 20,
  },
  classement: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textScore: {
    padding: 5,
  },
  date: modal => ({
    marginTop: modal ? 0 : 25,
    marginBottom: modal ? 0 : 5,
    fontSize: 18,
    fontWeight: modal ? '400' : '600',
    textAlign: 'center',
    color: Colors.darker,
  }),
});
