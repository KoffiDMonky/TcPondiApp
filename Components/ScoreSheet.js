import React, {useState, useEffect} from 'react';
import {
  Text,
  Pressable,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MeetDate from './MeetDate';
import PlayerTeam from './PlayerTeam';

export default ScoreSheet = props => {
  const scoreSheetId = props.scoreSheetId;
  const idHomologation = props.idHomologation;
  const idDivision = props.idDivision;
  const equipe1 = props.equipe1;
  const equipe2 = props.equipe2;
  const score1 = props.score1;
  const score2 = props.score2;
  const setModalVisible = props.setModalVisible;

  //Affiche l'app quand la donnée est chargée
  const [isLoading, setLoading] = useState(true);
  //Récupère les données de l'API
  const [data, setData] = useState([]);

  //Récupère les données de la rencontre
  const getDetail = async () => {
    try {
      const response = await fetch(
        `https://gstennis.azurewebsites.net/api/fdm/${idHomologation}/${idDivision}/${scoreSheetId}`,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  const matches = data.matches;
  let ScoreSheetResult = [];

  if (matches) {
    for (const [i, match] of matches.entries()) {

      ScoreSheetResult.push(
        <View key={i} style={styles.playerTeamContainer}>
          <PlayerTeam
            joueur1={match.joueur1Equipe1}
            joueur2={match.joueur2Equipe1}
            score1={match.score1Equipe1}
            score2={match.score2Equipe1}
            score3={match.score3Equipe1}
            result={match.resultat === "V" && match.resultat}
          />
          <PlayerTeam
            joueur1={match.joueur1Equipe2}
            joueur2={match.joueur2Equipe2}
            score1={match.score1Equipe2}
            score2={match.score2Equipe2}
            score3={match.score3Equipe2}
            result={match.resultat === "D" && match.resultat}
          />
        </View>,
      );
    }
  }

  useEffect(() => {
    getDetail();
  }, [scoreSheetId]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.pressableContainer}>
            <MeetDate dateTheorique={data.date} modal={true} />
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}>
              <Icon name={'times'} size={25} color={Colors.darker} />
            </Pressable>
          </View>
          <ResultItem
            equipe1={equipe1}
            equipe2={equipe2}
            score1={score1}
            score2={score2}
          />
          <View style={styles.scoreContainer}>
            <ScrollView>{ScoreSheetResult}</ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    padding: 1,
    width: '100%',
    alignItems: 'center',
  },
  pressableContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  scoreContainer: {
    flex: 4,
    borderTopWidth: 2,
    borderTopColor: '#8ABC30',
    width: '100%',
    paddingTop: 20,
  },
  playerTeamContainer: {
    width: '100%',
    marginVertical: 5,
    backgroundColor: Colors.lighter,
    borderRadius: 10,
  },
  buttonClose: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    marginLeft: 20,
  },
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
