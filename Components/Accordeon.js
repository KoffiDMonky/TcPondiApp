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
  const title = props.title;
  const rencontres = props.rencontres;
  const detailsEquipes = props.detailsEquipes;

  //   console.log(rencontres);
  const [expanded, setExpanded] = useState(true);

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

  const [displayDate, setDisplayDate] = useState(true);

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  const items = [];

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
      console.log('rencontre', rencontres[i - 1].dateTheorique);
      // hideDate(false);
    }

    const teamOneName = detailsEquipes.filter(
      equipe => equipe.idEquipe === rencontre.equipe1.id,
    );
    const teamTwoName = detailsEquipes.filter(
      equipe => equipe.idEquipe === rencontre.equipe2.id,
    );

    items.push(
      <View key={i} style={{backgroundColor: 'red'}}>
        {displayDate && <Text>{date}</Text>}
        <View style={{flexDirection: 'row'}}>
          <Text>{teamOneName[0].club.nom} </Text>
          <Text>{rencontre.score1}-</Text>
          <Text>{rencontre.score2} </Text>
          <Text>{teamTwoName[0].club.nom} </Text>
        </View>
      </View>,
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
        <Text style={[styles.title, styles.font]}>{title}</Text>
        <Icon
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={30}
          color={'grey'}
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && <ScrollView style={styles.child}>{items}</ScrollView>}
    </View>
  );
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
});
