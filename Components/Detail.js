import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Picker from '@ouroboros/react-native-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Accordeon from './Accordeon';
import Ranking from './Ranking';
import ScoreSheet from './ScoreSheet';
import ResultItem from './ResultItem';

export default Detail = props => {
  const setShowDetails = props.setShowDetails;
  const idEquipe = props.idEquipe;
  const idHomologation = props.idHomologation;
  const idDivision = props.idDivision;

  //Affiche l'app quand la donnée est chargée
  const [isLoading, setLoading] = useState(true);
  //Récupère les données de l'API
  const [data, setData] = useState([]);
  let paramPhases = [];
  //Défini la valeur du selecteur
  let [picker, setPicker] = useState('PHASE PRELIMINAIRE');
  //Gestion de la modale
  const [modalVisible, setModalVisible] = useState(false);
  const [scoreSheetId, setScoreSheetId] = useState('');
  const [equipe1, setEquipe1] = useState('');
  const [equipe2, setEquipe2] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  const setModal = (bool, id, equipe1, equipe2, score1, score2) => {
    setModalVisible(bool);
    setScoreSheetId(id);
    setEquipe1(equipe1);
    setEquipe2(equipe2);
    setScore1(score1);
    setScore2(score2);
  };

  const closeModal = bool => setModalVisible(bool);

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

  //Données des équipes
  const team = props.team;

  //Contient le nom de l'équipe sélectionné
  const teamName = [];

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
      labelStyle={{color: Colors.darker, fontSize: 12}}
    />
  );

  //Contenu du tab 1 : rencontres
  const FirstRoute = () => (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScoreSheet
              scoreSheetId={scoreSheetId}
              idHomologation={idHomologation}
              idDivision={idDivision}
              equipe1={equipe1}
              equipe2={equipe2}
              score1={score1}
              score2={score2}
              setModalVisible={closeModal}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.tabContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.text}>{data.hLib}</Text>
          <Text style={styles.textBold}>{data.division}</Text>
        </View>
        <View>{items}</View>
      </ScrollView>
    </View>
  );

  //Contenu du tab 2 : Equipes
  const SecondRoute = () => (
    <ScrollView style={styles.tabContainer}>
      <Picker
        onChanged={setPicker}
        options={paramPhases}
        style={{
          borderWidth: 1,
          borderColor: Colors.lighter,
          borderRadius: 5,
          marginVertical: 5,
          padding: 5,
          color: Colors.darker,
        }}
        textAlign={'center'}
        value={picker}
      />
      {detailsEquipes}
    </ScrollView>
  );

  //Contenu du tab 3 : Classement
  const ThirdRoute = () => (
    <ScrollView>
      <Picker
        onChanged={setPicker}
        options={paramPhases}
        style={{
          borderWidth: 1,
          borderColor: Colors.lighter,
          borderRadius: 5,
          marginTop: 20,
          marginVertical: 5,
          marginHorizontal: 20,
          padding: 5,
          color: Colors.darker,
        }}
        textAlign={'center'}
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
      if (phase.detailsEquipes !== undefined) {
        const dataTeam = team.filter(equipe => equipe.id === idEquipe);
        teamName.push(dataTeam[0].nom);
      }

      //Si l'on est dans le tab rencontres, on mets l'accordéon dans le tableau items
      if (index === 0) {
        items.push(
          <Accordeon
            key={i}
            tab={index}
            title={phase.phase.phase.libelle}
            rencontres={phase.rencontres}
            detailsEquipes={phase.detailsEquipes}
            setModalVisible={setModal}
          />,
        );
      }
      paramPhases.push({
        value: phase.phase.phase.libelle,
        text: phase.phase.phase.libelle,
      });
    }
  }

  //Filtre la phase en fonction de la valeur du sélecteur
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
        //Tri du classement
        const sortRanking = phase.classements.sort((a, b) => a.place - b.place);
        let isClub = false;

        for (const [j, team] of sortRanking.entries()) {
          // Permet d'identifier le club
          const regex = /PONDI/g;
          const club = team.nom;
          isPondi = club.match(regex);

          isClub = false;
          if (isPondi !== null) {
            isClub = true;
          }

          teamsRanking.push(
            <View key={j} style={styles.row(isClub)}>
              <Text style={[{flex: 1}, styles.textTable(isClub)]}>
                N° {team.place}
              </Text>
              <Text style={[{flex: 3}, styles.textTable(isClub)]}>
                {team.nom}
              </Text>
              <Text style={[{flex: 1}, styles.textTable(isClub)]}>
                {team.points} pts
              </Text>
            </View>,
          );
        }
      }
    }
  }

  useEffect(() => {
    getDetail();
  }, [idEquipe, idHomologation, idDivision]);

  useEffect(() => {
    if (data.phases !== undefined) {
      setPicker(phases[0].phase.phase.libelle);
    }
  }, [data.phases]);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        ''
      ) : (
        <TouchableOpacity
          onPress={() => setShowDetails(false)}
          style={styles.touchable}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'chevron-left'} size={20} color={Colors.darker} />
            <Text style={styles.text}>{teamName}</Text>
          </View>
        </TouchableOpacity>
      )}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
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
  container: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flex: 1,
    width: '100%',
  },
  row: isClub => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.lighter,
    paddingVertical: 12,
    backgroundColor: isClub ? '#b0e0e6' : '#ffffff',
  }),
  subtitleContainer: {
    marginBottom: 15,
  },
  touchable: {
    marginBottom: 20,
    marginLeft: 15,
  },
  text: {
    textAlign: 'left',
    color: Colors.darker,
    fontSize: 15,
    marginLeft: 5,
  },
  textBold: {
    textAlign: 'left',
    color: Colors.darker,
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '600',
  },
  textTable: isClub => ({
    textAlign: 'center',
    color: isClub ? '#2292CC' : Colors.darker,
    fontSize: 15,
    marginLeft: 5,
    fontWeight: isClub ? '600' : '400',
  }),
  //Rupture
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  pressableContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
  },
  buttonClose: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
