import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default TouchableItem = props => {
  const item = props.item;
  const showTeamState = props.showTeamState;

  const heightItem = props.height;
const shareCategorieTeam = props.shareCategorieTeam;
  return (
    <TouchableOpacity
      style={[styles.card , { height: heightItem }]}
      onPress={() => {
        showTeamState(true);
        shareCategorieTeam(item.libelle);
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.libelle}</Text>
        {/* <Icon name='wind' size={100} color='#000000'/> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    // backgroundColor: 'orange',
    borderColor: '#000000',
    color: '#20232a',
    margin: 5,
    // height: heightItem,
    borderWidth: 2,
    borderRadius: 15,
  },
  container: {
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: 'black',
    borderColor: 'black',
    textAlign: 'center',
  },
  imgList: {
    height: '95%',
    width: '95%',
    resizeMode: 'contain',
  },
});
