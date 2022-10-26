import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import TouchableItem from './TouchableItem';

export default Categories = props => {
  const isLoading = props.isLoading;
  const showTeamState = props.showTeamState;
  const cate = props.cate;
  const shareCategorieTeam = props.shareCategorieTeam;
  const categoriesData = props.categoriesData;

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          numColumns={2}
          style={{
            flexGrow: 0,
          }}
          data={cate}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => <TouchableItem height={150} item={item} showTeamState={showTeamState} shareCategorieTeam={shareCategorieTeam}/>}
        />
      )}
    </View>
  );
};
