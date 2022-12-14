import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResultItem from './ResultItem';
import MeetDate from './MeetDate';

export default Accordeon = props => {
  //Propriétés récupérées dans le composant
  const tab = props.tab;
  const title = props.title;
  const rencontres = props.rencontres;
  const detailsEquipes = props.detailsEquipes;
  const detailsEquipe = props.detailsEquipe;
  const setModalVisible = props.setModalVisible;

  //Ouverture ou fermeture de l'accordéon
  const [expanded, setExpanded] = useState(true);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  //Animation de l'ouverture et fermeture de l'accordéon
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  //Affichage de la date
  let displayDate = true;

  //Méthode filtrant les objets
  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  //Tableau de rencontres
  const meets = [];

  //Permet de déterminier si c'est le club ou non (pour styliser le texte en fonction)
  let isClub = false;

  if (rencontres) {
    //Boucle permettant de récupérer les rencontres
    for (const [i, rencontre] of rencontres.entries()) {
      //Permet d'afficher la date par groupe de rencontre
      if (
        rencontres[i - 1] !== undefined &&
        rencontres[i - 1].dateTheorique === rencontre.dateTheorique
      ) {
        displayDate = false;
      } else {
        displayDate = true;
      }

      //Permet de récupérer le nom de l'équipe dans l'objet detailsEquipes en fonction de son identifiant
      const teamOneName = detailsEquipes.filter(
        equipe => equipe.idEquipe === rencontre.equipe1.id,
      );
      const teamTwoName = detailsEquipes.filter(
        equipe => equipe.idEquipe === rencontre.equipe2.id,
      );

      //Permet d'identifier si c'est le club ou pas
      const regex = /PONDI/g;
      const club1 = teamOneName[0].club.nom;
      const club2 = teamTwoName[0].club.nom;
      isPondi1 = club1.match(regex);
      isPondi2 = club2.match(regex);

      isClub = false;
      if (isPondi1 !== null || isPondi2 !== null) {
        isClub = true;
      }

      //Identifiant de la feuille de match
      const scoreSheetId = rencontre.idFeuilleDeMatch;

      //On envoie les rencontres dans le tableau meets
      meets.push(
        <View key={i} style={{flex: 1}}>
          {displayDate && <MeetDate dateTheorique={rencontre.dateTheorique} />}
          {scoreSheetId ? (
            <TouchableOpacity
              id={scoreSheetId}
              onPress={() =>
                setModalVisible(
                  true,
                  scoreSheetId,
                  teamOneName[0].club.nom,
                  teamTwoName[0].club.nom,
                  rencontre.score1,
                  rencontre.score2,
                )
              }>
              <ResultItem
                equipe1={teamOneName[0].club.nom}
                equipe2={teamTwoName[0].club.nom}
                score1={rencontre.score1}
                score2={rencontre.score2}
                isClub={isClub}
              />
            </TouchableOpacity>
          ) : (
            <ResultItem
              equipe1={teamOneName[0].club.nom}
              equipe2={teamTwoName[0].club.nom}
              score1={rencontre.score1}
              score2={rencontre.score2}
              isClub={isClub}
            />
          )}
        </View>,
      );
    }
  }

  //Affichages différents en fonction de l'onglet ouvert
  switch (tab) {
    case 0:
      if (rencontres) {
        return (
          <View style={{flex: 5}}>
            <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
              <Text style={[styles.title, styles.font]}>{title}</Text>
              <Icon
                name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={30}
                color={'grey'}
              />
            </TouchableOpacity>
            <View style={styles.parentHr} />
            {expanded && <View style={styles.child}>{meets}</View>}
          </View>
        );
      } else {
        return <Text>Bientôt disponible</Text>;
      }
      break;
    case 1:
      if (detailsEquipe) {
        return (
          <View style={{height: 'auto'}}>
            <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
              <Text style={[styles.title, styles.font]}>{title}</Text>
              <Icon
                name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={30}
                color={'grey'}
              />
            </TouchableOpacity>
            <View style={styles.parentHr} />
            {expanded && (
              <View style={styles.child}>
                <Text style={styles.textCorrespondant}>
                  Code club: {detailsEquipe.club.code}
                </Text>
                <View>
                  {detailsEquipe.club.correspondantClub.adresse1Corresp && (
                    <Text style={styles.textCorrespondant}>
                      {detailsEquipe.club.correspondantClub.adresse1Corresp}
                    </Text>
                  )}
                  {detailsEquipe.club.correspondantClub.adresse2Corresp && (
                    <Text style={styles.textCorrespondant}>
                      {detailsEquipe.club.correspondantClub.adresse2Corresp}
                    </Text>
                  )}
                  <Text style={styles.textCorrespondant}>
                    Ville: {detailsEquipe.club.correspondantClub.villeCorresp}
                  </Text>
                  <Text style={styles.textCorrespondant}>
                    Correspondant: {detailsEquipe.correspondant.nom}
                  </Text>
                </View>
                {detailsEquipe.correspondant.telPortable && (
                  <Text style={styles.textCorrespondant}>
                    Portable: {detailsEquipe.correspondant.telPortable}
                  </Text>
                )}
                {detailsEquipe.correspondant.telPerso && (
                  <Text style={styles.textCorrespondant}>
                    Fixe: {detailsEquipe.correspondant.telPerso}
                  </Text>
                )}
                {detailsEquipe.correspondant.email && (
                  <Text style={styles.textCorrespondant}>
                    Email: {detailsEquipe.correspondant.email}
                  </Text>
                )}
              </View>
            )}
          </View>
        );
      } else {
        return <Text style={styles.textCorrespondant}>Bientôt disponible</Text>;
      }
      break;
    case 2:
      break;

    default:
      break;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Colors.lighter,
  },
  parentHr: {
    height: 1,
    color: Colors.lighter,
    width: '100%',
  },
  item: {
    flex: 1,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  child: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.lighter,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
  },
  date: {
    marginBottom: 5,
    marginTop: 25,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.darker,
  },
  text: isClub => ({
    color: isClub ? '#D20A80' : Colors.darker,
  }),
  textResult: isClub => ({
    color: isClub ? '#D20A80' : Colors.darker,
    fontSize: 17,
    fontWeight: isClub ? '600' : '400',
    margin: 1,
  }),
  textCorrespondant: {
    color: Colors.darker,
    margin: 5,
    fontSize: 15,
  },
});
