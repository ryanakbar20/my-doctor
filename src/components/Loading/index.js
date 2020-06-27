import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {colors, fonts} from '../../utils';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.green} size="large" />
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.loading,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  loading: {
    color: colors.green,
    fontFamily: fonts[800],
    marginTop: 5,
  },
});
