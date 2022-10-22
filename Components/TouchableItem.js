import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default TouchableItem = (props) => { 

    const item = props.item;

    return (
        <TouchableOpacity
        style={[styles.card, {borderColor: '#000000'}]}
        onPress={() => {console.log('toto')} }>
        <Text >{item.libelle}</Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: '#F6F6F6',
      color: '#20232a',
      margin: 5,
      height: 170,
      borderWidth: 2,
      borderRadius: 15,
    },
  
    head: {
      flex: 0.8,
      alignItems: 'flex-end',
      paddingRight: 10,
    },
  
    body: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    bottom: {
      flex: 1.5,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    title: {
      fontSize: 20,
      color: 'white',
      borderColor: 'black',
    },
  
    num: {
      fontSize: 20
    },
    imgList: {
      height: '95%',
      width: '95%',
      resizeMode: 'contain',
    },
  });