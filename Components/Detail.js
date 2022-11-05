import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ScrollView,
  Button,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Accordeon from './Accordeon';

export default Detail = props => {
  const setShowDetails = props.setShowDetails;
  const idEquipe = props.idEquipe;
  const idHomologation = props.idHomologation;
  const idDivision = props.idDivision;

  //Affiche l'app quand la donnée est chargée
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //Récupère les données
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

  const phases = data.phases;
  const items = [];
  const detailsEquipes = [];

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: '#91BF2C'}}
    />
  );

  const FirstRoute = () => (
    <ScrollView style={{flex: 1, backgroundColor: Colors.lighter}}>
      <Button title="retour" onPress={() => setShowDetails(false)} />
      <Text>{data.hLib}</Text>
      <Text>{data.division}</Text>
      {items}
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView style={{flex: 1, backgroundColor: Colors.lighter}}>
      {detailsEquipes}
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView style={{flex: 1, backgroundColor: Colors.lighter}}>
      <Text>Classement</Text>
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

  if (phases) {
    for (const [i, phase] of phases.entries()) {
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

      console.log('detailsEquipes',phase);

      if (index === 1 && phase.detailsEquipes !== undefined) {
        for (const [i, team] of phase.detailsEquipes.entries())
        detailsEquipes.push(
          <Accordeon
            key={i}
            tab={index}
            title={team.club.nom}
            detailsEquipe={team}
          />,
        );


      }
    }
  }

  useEffect(() => {
    getDetail();
  }, [idEquipe, idHomologation, idDivision]);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        // <View>
        //   <Button title="retour" onPress={() => setShowDetails(false)} />
        //   <Text>Rencontre</Text>
        //   <Text>Division:{data.division}</Text>
        // </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      )}
    </View>
  );
};
