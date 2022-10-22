import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import TouchableItem from './TouchableItem';


export default Categories = () => { 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const cate = [{id : 0 , libelle : "Garçons"}, 
                {id : 1 , libelle : "Fille"}, 
                {id : 2 , libelle : "Hommes"}, 
                {id : 3 , libelle : "Femmes"}, 
                {id : 4 , libelle : "Hommes"}, 
                {id : 5 , libelle : "Femmes"}]


  const getTcPondi = async () => {
     try {
      const month = new Date().getMonth();  
      let year;
      
      if(month < 9){
        year = new Date().getFullYear();
      } else {
        year = new Date().getFullYear() + 1;
      }

      //console.log('month', month);
      //console.log('year', year);
      const response = await fetch('https://gstennis.azurewebsites.net/api/equipes?codeClub=52560056&millesime='+ year);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTcPondi();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={cate}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableItem item ={item}/>
          )}
        />
      )}
    </View>
  );
};