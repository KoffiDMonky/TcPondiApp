import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default TouchableItem = props => {
  let categorie;
  let teams;
  let icon;

  const showTeamState = props.showTeamState;
  const heightItem = props.height;
  const shareCategorieTeam = props.shareCategorieTeam;

  if (props.item) {
    categorie = props.item;
    icon = props.item.icon;
  }
  if (props.teams) {
    teams = props.teams;
  }

  if (teams) {
    return (
      <TouchableOpacity
        style={[styles.card, {height: heightItem}]}
        onPress={() => {
          console.log('toto');
        }}>
        <View style={styles.container}>
          <Text style={styles.title}>{teams.nom}</Text>
          {/* <Icon name='wind' size={100} color='#000000'/> */}
        </View>
      </TouchableOpacity>
    );
  } else if (categorie.length) {
    return (
      <TouchableOpacity
        style={[styles.card, {height: heightItem}]}
        onPress={() => {
          console.log('toto');
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
});
