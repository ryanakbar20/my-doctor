import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Doctor1} from '../../../assets/dummy/images';
import {fonts, colors} from '../../../utils';
import {ICStar} from '../../../assets/icons';

const RatedDoctor = ({pict, name, desc, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.image} source={{uri: pict}} alt="pict" />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{desc}</Text>
        </View>
      </View>
      <View style={styles.star}>
        <ICStar />
        <ICStar />
        <ICStar />
        <ICStar />
        <ICStar />
      </View>
    </TouchableOpacity>
  );
};

export default RatedDoctor;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts[600],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: fonts[400],
    color: colors.text.light,
    textTransform: 'capitalize',
  },
  star: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
