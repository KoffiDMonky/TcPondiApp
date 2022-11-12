import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default MeetDate = props => {
  const dateTheorique = props.dateTheorique;
  const modal = props.modal;

  //Mois de l'années
  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'octobre',
    'Novembre',
    'Décembre',
  ];
  
  //Date récupéré sur le serveur
  const serverDate = new Date(dateTheorique);
  //Récupération du jour
  const day = serverDate.getDate();
  //Récupération et traduction du mois
  const month = monthNames[serverDate.getUTCMonth()];
  //Récupération de l'année
  const year = serverDate.getFullYear();
  //Assemblage de la date
  const date = (day + ' ' + month + ' ' + year).toString();

  return <Text style={styles.date(modal)}>{date}</Text>;
};

const styles = StyleSheet.create({
  date: modal => ({
    marginTop: modal ? 0 : 25,
    marginBottom: modal ? 0 : 5,
    fontSize: 18,
    fontWeight:  modal ? '400' :'600',
    textAlign: 'center',
    color: Colors.darker,
  })
});
