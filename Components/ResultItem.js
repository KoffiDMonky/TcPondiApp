import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default ResultItem = props => {

    const equipe1 = props.equipe1;
    const equipe2 = props.equipe2;
    const score1 = props.score1;
    const score2 = props.score2;
    const isClub = props.isClub;


  return (
    <View style={styles.container}>
    <Text
      style={[{flex: 3, textAlign: 'right'}, styles.text(isClub)]}>
      {equipe1}
    </Text>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 18,
      }}>
      <Text style={styles.textResult(isClub)}>
        {score1}
      </Text>
      <Text style={styles.textResult(isClub)}>-</Text>
      <Text style={styles.textResult(isClub)}>
        {score2}
      </Text>
    </View>
    <Text style={[{flex: 3, textAlign: 'left'}, styles.text(isClub)]}>
      {equipe2}
    </Text>
  </View>

  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: isClub => ({
        color: isClub ? '#D20A80' : Colors.darker,
      }),
      textResult: isClub => ({
        color: isClub ? '#D20A80' : Colors.darker,
        fontSize: 17,
        fontWeight: isClub ? '600' : '400',
        margin: 1,
      }),

});
