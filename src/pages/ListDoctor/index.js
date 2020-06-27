import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, ListDoctor} from '../../components';
import {colors} from '../../utils';
import DataJson from '../../assets/dummy/data.json';
import {Doctor1} from '../../assets/dummy/images';
import {Firebase} from '../../config';

const ListDoctorCategory = ({navigation, route}) => {
  const data = route.params;
  const [Doctor, setDoctor] = useState([]);

  useEffect(() => {
    getDoctorByCategory(data.name);
  }, []);

  const getDoctorByCategory = category => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = [];
          const oldData = res.val();
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setDoctor(data);
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header
          onPress={() => navigation.goBack()}
          isWhite
          value={`Pilih ${data.name}`}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {Doctor.map(item => {
          return (
            <ListDoctor
              onPress={() => navigation.navigate('ProfileDoctor', item.data)}
              key={item.id}
              name={item.data.fullName}
              desc="Pria"
              pict={item.data.photo}
              next
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListDoctorCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    backgroundColor: colors.darkBlue,
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 20,
  },
});
