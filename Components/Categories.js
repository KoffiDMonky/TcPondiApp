import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TouchableItem from './TouchableItem';

export default Categories = props => {

  //Propriétés récupérées dans le composant
  const isLoading = props.isLoading;
  const showTeamState = props.showTeamState;
  const cate = props.cate;
  const shareCategorieTeam = props.shareCategorieTeam;

  return (
    <View style={{flex: 1, padding: 12}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View
          style={styles.container}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              Résultats championnats par équipes
            </Text>
          </View>
          <FlatList
            numColumns={2}
            style={{
              flexGrow: 1,
            }}
            data={cate}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <TouchableItem
                height={150}
                item={item}
                showTeamState={showTeamState}
                shareCategorieTeam={shareCategorieTeam}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitleContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.darker
  },
});
