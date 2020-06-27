import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../utils';

const Label = ({value, mb, mt, center, underline, fs, onPress}) => {
  return underline ? (
    <TouchableOpacity
      style={styles.container(mt, mb, center)}
      onPress={onPress}>
      <Text style={styles.title(underline, fs)}>{value}</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.container(mt, mb, center)}>
      <Text style={styles.title(underline, fs)}>{value}</Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: (mt, mb, center) => ({
    marginBottom: mb,
    marginTop: mt,
    alignItems: center ? 'center' : 'flex-start',
  }),
  title: (underline, fs) => ({
    fontSize: fs ? fs : 16,
    fontFamily: fonts[600],
    color: colors.text.light,
    textDecorationLine: underline ? 'underline' : 'none',
  }),
});
