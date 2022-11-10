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

export default Accordeon = props => {

  //Propriétés récupérées dans le composant
  const tab = props.tab;
  const title = props.title;
  const rencontres = props.rencontres;
  const detailsEquipes = props.detailsEquipes;
  const detailsEquipe = props.detailsEquipe;

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

      //Date récupéré sur le serveur
      const serverDate = new Date(rencontre.dateTheorique);
      //Récupération du jour
      const day = serverDate.getDate();
      //Récupération et traduction du mois
      const month = monthNames[serverDate.getUTCMonth()];
      //Récupération de l'année
      const year = serverDate.getFullYear();
      //Assemblage de la date
      const date = (day + ' ' + month + ' ' + year).toString();

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
      if(isPondi1 !== null || isPondi2 !== null){
        isClub = true;
      }

      //On envoie les rencontres dans le tableau meets
      meets.push(
        <View key={i} style={{flex: 1}}>
          {displayDate && <Text style={styles.date}>{date}</Text>}
          <View style={styles.container}>
            <Text style={[{flex: 3, textAlign: 'right'}, styles.text(isClub)]}>
              {teamOneName[0].club.nom}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 18,
              }}>
              <Text style={styles.textResult(isClub)}>{rencontre.score1}</Text>
              <Text style={styles.textResult(isClub)}>-</Text>
              <Text style={styles.textResult(isClub)}>{rencontre.score2} </Text>
            </View>
            <Text style={[{flex: 3, textAlign: 'left',}, styles.text(isClub)]}>
              {teamTwoName[0].club.nom}
            </Text>
          </View>
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
                <Text style={styles.text(isClub)}>
                  {title} - {detailsEquipe.club.code}
                </Text>
                <View>
                  <Text style={styles.text(isClub)}>
                    {detailsEquipe.club.correspondantClub.adresse1Corresp}
                  </Text>
                  <Text style={styles.text(isClub)}>
                    {detailsEquipe.club.correspondantClub.adresse2Corresp}
                  </Text>
                  <Text style={styles.text(isClub)}>{detailsEquipe.club.correspondantClub.nomCorresp}</Text>
                </View>
                <Text style={styles.text(isClub)}>
                  {detailsEquipe.club.correspondantClub.telPortableCorresp}
                </Text>
                <Text style={styles.text(isClub)}>{detailsEquipe.club.courriel}</Text>
              </View>
            )}
          </View>
        );
      } else {
        return <Text style={styles.text(isClub)}>Bientôt disponible</Text>;
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
  text: (isClub) => ({
    color: isClub ? '#D20A80' : Colors.darker ,
  }),
  textResult: (isClub) => ({
    color: isClub ? '#D20A80' : Colors.darker ,
    fontSize: 17,
    fontWeight: isClub ? '600' : '400',
    margin: 1
  })
});
