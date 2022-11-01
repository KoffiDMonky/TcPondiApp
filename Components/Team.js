import React, {useState} from 'react';
import {StyleSheet, Text, FlatList, View, Button} from 'react-native';
import Detail from './Detail';
import TouchableItem from './TouchableItem';

export default Team = props => {
  const showTeamState = props.showTeamState;
  const categorieTeam = props.categorieTeam;
  const categoriesData = props.categoriesData;

  const [idEquipe , setIdEquipe] = useState('');
  const [idHomologation , setIdHomologation] = useState('');
  const [idDivision , setIdDivision] = useState('');

  const setTeamParameter = (idEquipe,idHomologation,idDivision) => {
    setIdEquipe(idEquipe);
    setIdHomologation(idHomologation);
    setIdDivision(idDivision);
  }

  //Permet d'afficher le détail des rencontres
  const [showDetails, setShowDetails] = useState(false);
  const showDetailsState = bool => {
    setShowDetails(bool);
  };

  return (
    <View style={styles.container(showDetails)}>
      {showDetails ? (
        <Detail setShowDetails = {setShowDetails} idEquipe = {idEquipe} idHomologation = {idHomologation} idDivision={idDivision} />
      ) : (
        <View>
          <Button title="retour" onPress={() => showTeamState(false)} />
          <Text style={styles.text}>{categorieTeam}</Text>
          <FlatList
            style={{
              flexGrow: 0,
            }}
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
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:(showDetails) => ({
    flex: 1,
    padding: showDetails === true ?  0 : 24,
    justifyContent: 'center'
  }),
  text: {
    textAlign: 'center',
  },
});
