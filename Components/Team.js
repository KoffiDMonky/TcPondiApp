import React from 'react';
import {StyleSheet, Text, FlatList, View, Button} from 'react-native';
import TouchableItem from './TouchableItem';

export default Team = props => {
  const data = props.data;
  const team = props.team;
  const showTeamState = props.showTeamState;
  const categorieTeam = props.categorieTeam;
  const categoriesData = props.categoriesData;

  return (
    <View style={styles.container}>
      <Button title="retour" onPress={() => showTeamState(false)} />
      <Text style={styles.text}>{categorieTeam}</Text>
      <FlatList
        style={{
          flexGrow: 0,
        }}
        data={team}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => <TouchableItem height={70} item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
