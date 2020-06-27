import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import {
  ILDokterUmum,
  ILDokterAnak,
  ILDokterPsikiater,
  ILDokterObat,
} from '../../../assets/icons';

const ILDokter = ({type}) => {
  if (type == 'dokter umum') {
    return <ILDokterUmum />;
  }
  if (type == 'psikiater') {
    return <ILDokterPsikiater />;
  }
  if (type == 'dokter obat') {
    return <ILDokterObat />;
  }
  if (type == 'dokter anak') {
    return <ILDokterAnak />;
  }
  return <ILDokterAnak />;
};

const DoctorCategory = ({value, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ILDokter type={value} />
      <View>
        <Text style={styles.title}>Saya Butuh</Text>
        <Text style={styles.subTitle}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCategory;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 130,
    borderRadius: 10,
    backgroundColor: colors.softGreen,
    marginRight: 10,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts[300],
    color: colors.text.secondary,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  subTitle: {
    fontFamily: fonts[600],
    color: colors.text.secondary,
    fontSize: 12,
    textTransform: 'capitalize',
  },
});
