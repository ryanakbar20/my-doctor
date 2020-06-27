import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Cover, Hospital1} from '../../assets/dummy/images';
import {fonts, colors} from '../../utils';
import {HospitalList} from '../../components';
import DataJson from '../../assets/dummy/data.json';
import {Firebase} from '../../config';

const Hospitals = () => {
  const [Hospitals, setHospitals] = useState([]);

  useEffect(() => {
    Firebase.database()
      .ref('/hospitals/')
      .once('value')
      .then(res => {
        const data = [];
        const oldData = res.val();
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        setHospitals(data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={Cover} alt="photo">
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.subTitle}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.hospitalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {Hospitals.map(item => {
              return (
                <HospitalList
                  key={item.data.id}
                  name={item.data.title}
                  address={item.data.address}
                  pict={item.data.image}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    height: 240,
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontFamily: fonts[600],
    fontSize: 20,
    color: colors.white,
  },
  subTitle: {
    fontFamily: fonts[400],
    fontSize: 14,
    color: colors.white,
    marginTop: 6,
  },
  hospitalContainer: {
    backgroundColor: colors.white,
    borderRadius: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1,
    marginTop: -20,
  },
});
