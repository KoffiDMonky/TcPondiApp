import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
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
  const tab = props.tab;
  const title = props.title;
  const rencontres = props.rencontres;
  const detailsEquipes = props.detailsEquipes;
  const detailsEquipe = props.detailsEquipe;

  const [expanded, setExpanded] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'September',
    'octobre',
    'Novembre',
    'Décembre',
  ];

  let displayDate = true;

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  const meets = [];

  if (rencontres) {
    for (const [i, rencontre] of rencontres.entries()) {
      const serverDate = new Date(rencontre.dateTheorique);
      const day = serverDate.getDate();
      const month = monthNames[serverDate.getUTCMonth()];
      const year = serverDate.getFullYear();
      const date = (day + ' ' + month + ' ' + year).toString();

      if (
        rencontres[i - 1] !== undefined &&
        rencontres[i - 1].dateTheorique === rencontre.dateTheorique
      ) {
        displayDate = false;
      } else {
        displayDate = true;
      }

      const teamOneName = detailsEquipes.filter(
        equipe => equipe.idEquipe === rencontre.equipe1.id,
      );
      const teamTwoName = detailsEquipes.filter(
        equipe => equipe.idEquipe === rencontre.equipe2.id,
      );

      meets.push(
        <View key={i} style={{flex: 1}}>
          {displayDate && (
            <Text style={{marginBottom: 5, marginTop: 15}}>{date}</Text>
          )}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 3, textAlign:'right'}}>{teamOneName[0].club.nom}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}} >
              <Text>{rencontre.score1}</Text>
              <Text>-</Text>
              <Text>{rencontre.score2} </Text>
            </View>
            <Text style={{flex: 3, textAlign:'left'}}>{teamTwoName[0].club.nom} </Text>
          </View>
        </View>,
      );
    }
  }

  // const viewMeets = () => {
  //   if (rencontres) {
  //     return (
  //       <View>
  //         <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
  //           <Text style={[styles.title, styles.font]}>{title}</Text>
  //           <Icon
  //             name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
  //             size={30}
  //             color={'grey'}
  //           />
  //         </TouchableOpacity>
  //         <View style={styles.parentHr} />
  //         {expanded && <ScrollView style={styles.child}>{meets}</ScrollView>}
  //       </View>
  //     );
  //   } else {
  //     return <Text>Bientôt disponible</Text>;
  //   }
  // };

  // const viewTeams = () => {
  //   if (detailsEquipes) {
  //     return (
  //       <View>
  //         <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
  //           <Text style={[styles.title, styles.font]}>{title}</Text>
  //           <Icon
  //             name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
  //             size={30}
  //             color={'grey'}
  //           />
  //         </TouchableOpacity>
  //         <View style={styles.parentHr} />
  //         {expanded && <ScrollView style={styles.child}>{meets}</ScrollView>}
  //       </View>
  //     );
  //   } else {
  //     return <Text>Bientôt disponible</Text>;
  //   }
  // };

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
                <Text>
                  {title} - {detailsEquipe.club.code}
                </Text>
                <View>
                  <Text>
                    {detailsEquipe.club.correspondantClub.adresse1Corresp}
                  </Text>
                  <Text>
                    {detailsEquipe.club.correspondantClub.adresse2Corresp}
                  </Text>
                  <Text>{detailsEquipe.club.correspondantClub.nomCorresp}</Text>
                </View>
                <Text>
                  {detailsEquipe.club.correspondantClub.telPortableCorresp}
                </Text>
                <Text>{detailsEquipe.club.courriel}</Text>
              </View>
            )}
          </View>
        );
      } else {
        return <Text>Bientôt disponible</Text>;
      }
      break;
    case 2:
      break;

    default:
      break;
  }
};

const styles = StyleSheet.create({
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
    marginBottom: 20
  },
});
