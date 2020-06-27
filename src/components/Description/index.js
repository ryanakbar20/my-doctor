import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ICNext} from '../../assets/icons';
import {colors, fonts} from '../../utils';

const Description = ({name, desc, next}) => {
  return (
    <TouchableOpacity style={styles.page}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{desc}</Text>
        </View>
      </View>
      {next ? <ICNext /> : <View />}
    </TouchableOpacity>
  );
};

export default Description;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  container: {
    flexDirection: 'row',
    marginTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: fonts[400],
    color: colors.text.light,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fonts[400],
    color: colors.text.secondary,
    marginTop: 6,
  },
});
