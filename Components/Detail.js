import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ScrollView,
  Button,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Picker from '@ouroboros/react-native-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Accordeon from './Accordeon';
import Ranking from './Ranking';

export default Detail = props => {
  const setShowDetails = props.setShowDetails;
  const idEquipe = props.idEquipe;
  const idHomologation = props.idHomologation;
  const idDivision = props.idDivision;

  //Affiche l'app quand la donnée est chargée
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let paramPhases = [];
  let [picker, setPicker] = useState('PHASE PRELIMINAIRE');

  //Récupère les données du club
  const getDetail = async () => {
    try {
      const response = await fetch(
        `https://gstennis.azurewebsites.net/api/equipe?idEquipe=${idEquipe}&idHomologation=${idHomologation}&idDivision=${idDivision}`,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Données des différentes phases
  const phases = data.phases;

  //Tableau d'accordeon contenant les rencontres de chaque phases
  const items = [];

  //Tableau d'accordeon contenant le détail des équipes
  const detailsEquipes = [];

  //lignes du tableau contenant le classement
  const teamsRanking = [];

  //Filtre d'objet
  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  //------------------------------ Code de la TabBar (Début) ------------------------------//
  //Rendu de la tabBar
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.darker}}
      style={{backgroundColor: Colors.lighter}}
      labelStyle={{color: Colors.darker}}
    />
  );

  //Contenu du tab 1 : rencontres
  const FirstRoute = () => (
    <ScrollView style={styles.tabContainer}>
      <Button title="retour" onPress={() => setShowDetails(false)} />
      <Text>{data.hLib}</Text>
      <Text>{data.division}</Text>
      {items}
    </ScrollView>
  );

  //Contenu du tab 2 : Equipes
  const SecondRoute = () => (
    <ScrollView style={styles.tabContainer}>
      <Picker
        onChanged={setPicker}
        options={paramPhases}
        style={{
          borderWidth: 1,
          borderColor: '#a7a7a7',
          borderRadius: 5,
          marginVertical: 5,
          padding: 5,
        }}
        value={picker}
      />
      {detailsEquipes}
    </ScrollView>
  );

  //Contenu du tab 3 : Classement
  const ThirdRoute = () => (
    <ScrollView
      style={styles.tabContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      <Picker
        onChanged={setPicker}
        options={paramPhases}
        style={{
          borderWidth: 1,
          borderColor: '#a7a7a7',
          borderRadius: 5,
          marginVertical: 5,
          padding: 5,
        }}
        value={picker}
      />
      <Ranking teamsRanking={teamsRanking} />
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Rencontres'},
    {key: 'second', title: 'Equipes'},
    {key: 'third', title: 'Classement'},
  ]);

  //------------------------------ Code de la TabBar (FIN) ------------------------------//

  //On parcourt le tableau de phases
  if (phases) {
    for (const [i, phase] of phases.entries()) {
      //Si l'on est dans le tab rencontres, on mets l'accordéon dans le tableau items
      if (index === 0) {
        items.push(
          <Accordeon
            key={i}
            tab={index}
            title={phase.phase.phase.libelle}
            rencontres={phase.rencontres}
            detailsEquipes={phase.detailsEquipes}
          />,
        );
      }
      paramPhases.push({
        value: phase.phase.phase.libelle,
        text: phase.phase.phase.libelle,
      });
    }
  }

  if (phases !== undefined) {
    const filterPhase = phases.filter(
      phase => phase.phase.phase.libelle === picker,
    );
    //Si l'on est dans le tab equipes et que le détail des équipes n'est pas indefini, on mets l'accordeon dans le tableau détailsEquipes
    if (index === 1) {
      for (const [i, phase] of filterPhase.entries()) {
        for (const [j, team] of phase.detailsEquipes.entries()) {
          detailsEquipes.push(
            <Accordeon
              key={j}
              tab={index}
              title={team.club.nom}
              detailsEquipe={team}
            />,
          );
        }
      }
    }

    if (index === 2) {
      for (const [i, phase] of filterPhase.entries()) {

        // console.log(phase.classements); 
       const sortRanking = phase.classements.sort((a,b) => a.place - b.place);

        for (const [j, team] of sortRanking.entries()) {
          teamsRanking.push(
            <View
              key={j}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 2,
                paddingVertical: 12,
              }}>
              <Text style={{flex: 1}}>N° {team.place}</Text>
              <Text style={{flex: 3}}>{team.nom}</Text>
              <Text style={{flex: 1}}>{team.points} pts</Text>
            </View>,
          );
        }
      }
    }
  }

  useEffect(() => {
    getDetail();
  }, [idEquipe, idHomologation, idDivision]);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: layout.width, height: layout.height}}
          style={{flex: 1}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 20,
  },
});
