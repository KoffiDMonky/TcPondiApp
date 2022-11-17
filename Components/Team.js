import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import Detail from './Detail';
import TouchableItem from './TouchableItem';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Test from './Test';

export default Team = props => {

  //Propriété récupérées dans le composant
  const showTeamState = props.showTeamState;
  const categorieTeam = props.categorieTeam;
  const categoriesData = props.categoriesData;

  //Variable d'état des composants
  const [idEquipe, setIdEquipe] = useState('');
  const [idHomologation, setIdHomologation] = useState('');
  const [idDivision, setIdDivision] = useState('');

  //Défini les paramètres pour charger les données du club
  const setTeamParameter = (idEquipe, idHomologation, idDivision) => {
    setIdEquipe(idEquipe);
    setIdHomologation(idHomologation);
    setIdDivision(idDivision);
  };

  //Permet d'afficher le détail des rencontres
  const [showDetails, setShowDetails] = useState(false);
  const showDetailsState = bool => {
    setShowDetails(bool);
  };

  return (
    <View style={styles.container(showDetails)}>
      {showDetails ? (
        <Detail
          setShowDetails={setShowDetails}
          idEquipe={idEquipe}
          idHomologation={idHomologation}
          idDivision={idDivision}
          team={categoriesData}
        />
      ) : (
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => showTeamState(false)} style={styles.touchable}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name={'chevron-left'} size={20} color={Colors.darker} />
              <Text style={styles.text}>Catégories</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.subtitle}>{categorieTeam}</Text>
          <FlatList
            style={styles.flatlist}
            data={categoriesData}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <TouchableItem
                height={'auto'}
                teams={item}
                showDetailsState={showDetailsState}
                setTeamParameter={setTeamParameter}
              />
            )}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: showDetails => ({
    flex: 1,
    padding: showDetails === true ? 0 : 12,
    paddingBottom: 0,
    justifyContent: 'center',
  }),
  touchable: {
  },
  flatlist: {
    flexGrow: 0,
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center',
    color: Colors.darker,
    margin: 10
  },
  text: {
    textAlign: 'center',
    color: Colors.darker,
    fontSize: 15,
    marginLeft: 5
  },
});
