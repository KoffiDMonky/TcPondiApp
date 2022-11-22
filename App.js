import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  BackHandler,
  View,
  Image,
  Alert
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Categories from './Components/Categories';
import Team from './Components/Team';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  //Permet d'afficher les équipes par catégorie
  const [showTeam, setShowTeam] = useState(false);
  const showTeamState = bool => {
    setShowTeam(bool);
  };

  //Affiche l'app quand la donnée est chargée
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //Récupère les données
  const getTcPondi = async () => {
    try {

      //Calcul de l'année
      const month = new Date().getMonth();
      let year;
      if (month < 9) {
        year = new Date().getFullYear();
      } else {
        year = new Date().getFullYear() + 1;
      }
      const response = await fetch(
        'https://gstennis.azurewebsites.net/api/equipes?codeClub=52560056&millesime=' +
          year,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Données d'une catégorie
  let categoriesData = [];
  //Nom de la catégorie
  const [categorieTeam, setCategorieTeam] = useState('');
  const shareCategorieTeam = option => {
    setCategorieTeam(option);
  };

  //Les différentes catégories
  const cate = [
    {
      id: 0,
      libelle: 'Garçons',
      item: 'garçons',
      length: data.garcons ? data.garcons.length : '0',
      icon: {glyph: 'child', color: '#8ABC30'},
    },
    {
      id: 1,
      libelle: 'Filles',
      item: 'filles',
      length: data.filles ? data.filles.length : '0',
      icon: {glyph: 'child', color: '#8ABC30'},
    },
    {
      id: 2,
      libelle: 'Hommes',
      item: 'hommes',
      length: data.hommes ? data.hommes.length : '0',
      icon: {glyph: 'male', color: '#2292CC'},
    },
    {
      id: 3,
      libelle: 'Femmes',
      item: 'femmes',
      length: data.femmes ? data.femmes.length : '0',
      icon: {glyph: 'female', color: '#2292CC'},
    },
    {
      id: 4,
      libelle: 'Hommes+',
      item: 'hommesPlus',
      length: data.hommesPlus ? data.hommesPlus.length : '0',
      icon: {glyph: 'male', color: '#D20A80'},
    },
    {
      id: 5,
      libelle: 'Femmes+',
      item: 'femmesPlus',
      length: data.femmesPlus ? data.femmesPlus.length : '0',
      icon: {glyph: 'female', color: '#D20A80'},
    },
  ];

  //Switch pour charger les bonnes donnée en fonction de la catégorie
  switch (categorieTeam) {
    case 'Garçons':
      categoriesData = data.garcons;
      break;
    case 'Filles':
      categoriesData = data.filles;
      break;
    case 'Hommes':
      categoriesData = data.hommes;
      break;
    case 'Femmes':
      categoriesData = data.femmes;
      break;
    case 'Hommes+':
      categoriesData = data.hommesPlus;
      break;
    case 'Femmes+':
      categoriesData = data.femmesPlus;
      break;
    default:
      categoriesData = [];
  }

  const backAction = () => {
    Alert.alert("Op là!", "Est-tu sur de vouloir quitter TC Pondi App ?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    getTcPondi();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={Colors.lighter}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.lighter}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={{
              uri: 'data:image/png;base64,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',
            }}
          />
          <Text style={styles.title}> TC Pondi</Text>
        </View>

        <View style={styles.sectionDescription}>
          {showTeam ? (
            <Team
              style={styles.categories}
              data={data}
              showTeamState={showTeamState}
              categorieTeam={categorieTeam}
              categoriesData={categoriesData}
            />
          ) : (
            <Categories
              style={styles.categories}
              isLoading={isLoading}
              cate={cate}
              categorieTeam={categorieTeam}
              showTeamState={showTeamState}
              shareCategorieTeam={shareCategorieTeam}
              categoriesData={categoriesData}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'center',
    flex: 2,
    width: '100%',
  },
  sectionContainer: {
    height: '100%',
    backgroundColor: '#ffffff'
  },
  sectionTitle: {
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    width: '50%',
    color: Colors.darker
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    flex: 12,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default App;
