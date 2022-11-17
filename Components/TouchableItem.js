import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default TouchableItem = props => {
  //Déclarations de variable
  let categorie;
  let teams;
  let icon;

  //Propriété récupérées dans le composant
  const showTeamState = props.showTeamState;
  const heightItem = props.height;
  const shareCategorieTeam = props.shareCategorieTeam;
  const showDetailsState = props.showDetailsState;

  if (props.item) {
    categorie = props.item;
    icon = props.item.icon;
  }
  if (props.teams) {
    teams = props.teams;

    const setTeamParameter = props.setTeamParameter;

    const displayPhases = [];

    //Double boucle pour récupérer les différentes rencontres des différentes phases
    for (const [i, phase] of teams.phases.entries()) {
      const results = [];
      for (const [j, rencontre] of phase.rencontres.entries()) {

        //Switch pour afficher une icône spécifique en fonction du résultat de la rencontre
        switch (rencontre) {
          case 'null':
            results.push(
              <Text key={j} style={{margin: 5}}>
                <Icon name={'clock'} size={18} color={'black'} />,
              </Text>,
            );
            break;
          case 'V':
            results.push(
              <Text key={j} style={{margin: 5}}>
                <Icon name={'trophy'} size={18} color={'green'} />,
              </Text>,
            );
            break;
          case 'D':
            results.push(
              <Text key={j} style={{margin: 5}}>
                <Icon name={'thumbs-down'} size={18} color={'red'} />,
              </Text>,
            );
            break;
          case 'N':
            results.push(
              <Text key={j} style={{margin: 5}}>
                <Icon name={'handshake'} size={18} color={'orange'} />,
              </Text>,
            );
            break;
          default:
            results.push(
              <Text key={j} style={{margin: 5}}>
                <Icon name={'clock'} size={18} color={'black'} />,
              </Text>,
            );
            break;
        }
      }

      displayPhases.push(
        <View key={i} style={styles.bottomContainer}>
          <Text style={styles.text}>{phase.phase.phase.libelle}</Text>
          <Text style={styles.text}>
            {phase.phase.poule.nom} : {results}
          </Text>
        </View>,
      );
    }

    return (
      <TouchableOpacity
        style={[styles.card, {height: heightItem}]}
        onPress={() => {
          showDetailsState(true);
          setTeamParameter(teams.id, teams.homologation.id, teams.division.id);
        }}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>{teams.nom}</Text>
            <Text style={styles.subTitle}>{teams.homologation.libelle}</Text>
            <Text style={styles.subTitle}>{teams.division.nom}</Text>
          </View>
          {displayPhases}
          <View style={{flexDirection: 'row'}}></View>
        </View>
      </TouchableOpacity>
    );
  } else if (categorie.length) {
    let equipe;

    if(categorie.length <= 1){
      equipe = 'équipe'
    } else {
      equipe = 'équipes'
    }

    return (
      <TouchableOpacity
        style={[styles.card, {height: heightItem}]}
        onPress={() => {
          showTeamState(true);
          shareCategorieTeam(categorie.libelle);
        }}>
        <View style={styles.container}>
          <Text style={styles.title}>{categorie.libelle}</Text>
          <Text style={styles.count}>{categorie.length} {equipe}</Text>
          <Icon name={icon.glyph} size={50} color={icon.color} />
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderColor: '#000000',
    color: '#20232a',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    borderRadius: 15,
    padding: 15,
  },
  container: {
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  bottomContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    color: Colors.darker,
    borderColor: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  subTitle: {
    color: Colors.darker,
  },
  text: {
    fontSize: 15,
    marginBottom: 2,
    color: Colors.darker,
  },
  count: {
    fontSize: 20,
    color: 'black',
    borderColor: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
  imgList: {
    height: '95%',
    width: '95%',
    resizeMode: 'contain',
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
