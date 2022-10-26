/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Categories from './Components/Categories';
import Team from './Components/Team';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const cate = [
    {id: 0, libelle: 'Garçons', item : 'garçons'},
    {id: 1, libelle: 'Filles', item : 'filles'},
    {id: 2, libelle: 'Hommes', item : 'hommes'},
    {id: 3, libelle: 'Femmes', item : 'femmes'},
    {id: 4, libelle: 'Hommes+', item : 'hommesPlus'},
    {id: 5, libelle: 'Femmes+', item : 'femmesPlus'},
  ];

  const team = [
    {id: 0, libelle: 'TC Pondi 1'},
    {id: 1, libelle: 'TC Pondi 2'},
    {id: 2, libelle: 'TC Pondi 3'},
    {id: 3, libelle: 'TC Pondi 4'},
    {id: 4, libelle: 'TC Pondi 5'},
    {id: 5, libelle: 'TC Pondi 6'},
  ];

  const [showTeam, setShowTeam] = useState(false);

  const showTeamState = (bool) => {
    setShowTeam(bool);
  };

  const [categorieTeam, setCategorieTeam] = useState('');
  const shareCategorieTeam = (option) => {
    setCategorieTeam(option);
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getTcPondi = async () => {
    try {
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

  useEffect(() => {
    getTcPondi();
  }, []);

  let categoriesData;

  switch (categorieTeam) {
    case 'Garçons':
      categoriesData = data.garcons;
      break;
    case 'Filles':
      categoriesData =  data.filles;
      break;
    case 'Hommes':
      categoriesData =  data.hommes;
      break;
    case 'Femmes':
      categoriesData =  data.femmes;
      break;
    case 'Hommes+':
      categoriesData =  data.hommesplus;
      break;
    case 'Femmes+':
      categoriesData =  data.femmesplus;
      break;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        <View
          style={[
            styles.sectionTitle,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          <Text style={styles.title}> TC Pondi</Text>
        </View>

        <View
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>

          {showTeam ? (
            <Team style={styles.categories} data={data} team={team} showTeamState={showTeamState} categorieTeam={categorieTeam} categoriesData={categoriesData} />
          ) : (
            <Categories style={styles.categories} isLoading={isLoading} cate={cate} showTeamState={showTeamState} shareCategorieTeam={shareCategorieTeam} categoriesData={categoriesData}/>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    paddingHorizontal: 10,
    height: '100%',
  },
  sectionTitle: {
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionDescription: {
    // marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    flex: 12,
  },
  categories: {
    height: '100%',
  },
});

export default App;
