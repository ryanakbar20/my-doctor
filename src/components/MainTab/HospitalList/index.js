import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {fonts, colors} from '../../../utils';

const HospitalList = ({name, address, pict}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: pict}} alt="pict" />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subTitle}>{address}</Text>
      </View>
    </View>
  );
};

export default HospitalList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
    paddingBottom: 16,
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 60,
    marginRight: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts[400],
    color: colors.text.secondary,
    maxWidth: 160,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: fonts[300],
    color: colors.text.light,
  },
});
