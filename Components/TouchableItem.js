import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default TouchableItem = props => {
  let categorie;
  let teams;
  let icon;

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
    // const phaseLength = teams.phases.length;

    for (const [i, phase] of teams.phases.entries()) {
      const results = [];

      for (const [j, rencontre] of phase.rencontres.entries()) {
        switch (rencontre) {
          case 'null':
            results.push(
              <Icon
                key={j}
                name={'clock'}
                size={20}
                color={'black'}
                style={{margin: 2}}
              />,
            );
            break;
          case 'V':
            results.push(
              <Icon
                key={j}
                name={'trophy'}
                size={20}
                color={'green'}
                style={{margin: 2}}
              />,
            );
            break;
          case 'D':
            results.push(
              <Icon
                key={j}
                name={'thumbs-down'}
                size={20}
                color={'red'}
                style={{margin: 2}}
              />,
            );
            break;
          case 'N':
            results.push(
              <Icon
                key={j}
                name={'handshake'}
                size={20}
                color={'orange'}
                style={{margin: 2}}
              />,
            );
            break;
          default:
            results.push(
              <Icon
                key={j}
                name={'clock'}
                size={20}
                color={'black'}
                style={{margin: 2}}
              />,
            );
            break;
        }
      }

      displayPhases.push(
        <View key={i}>
          <Text style={styles.title}>{phase.phase.phase.libelle}</Text>
          <Text style={styles.title}>{phase.phase.poule.nom}</Text>
          <View style={styles.results}>{results}</View>
          {/* <Button title="Détails" onPress={() => showDetailsState(true)} /> */}
        </View>,
      );
    }

    return (
      <TouchableOpacity
        style={[styles.card, {height: heightItem}]}
        onPress={() => {
          showDetailsState(true);
          setTeamParameter(teams.id, teams.homologation.id, teams.division.id)
        }}>
        <View style={styles.container}>
          <Text style={styles.title}>{teams.nom}</Text>
          <Text style={styles.title}>{teams.homologation.libelle}</Text>
          <Text style={styles.title}>{teams.division.nom}</Text>
          {displayPhases}
          <View style={{flexDirection: 'row'}}></View>
        </View>
      </TouchableOpacity>
    );
  } else if (categorie.length) {
    return (
      <TouchableOpacity
        style={[styles.card, {height: heightItem}]}
        onPress={() => {
          showTeamState(true);
          shareCategorieTeam(categorie.libelle);
        }}>
        <View style={styles.container}>
          <Text style={styles.title}>{categorie.libelle}</Text>
          <Text style={styles.count}>({categorie.length})</Text>
          <Icon name={icon.glyph} size={50} color={icon.color} />
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderColor: '#000000',
    color: '#20232a',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    borderRadius: 15,
    padding: 15
  },
  container: {
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    borderColor: 'black',
    textAlign: 'center',
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
