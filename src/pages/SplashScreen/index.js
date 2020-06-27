import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconSplash} from '../../assets/icons';
import {fonts, colors} from '../../utils';
import {Firebase} from '../../config';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const unSubscribe = Firebase.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          navigation.replace('MainTab');
        } else {
          navigation.replace('GetStarted');
        }
      }, 2500);
    });
    return () => {
      unSubscribe();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <IconSplash />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 20,
    fontSize: 20,
    fontFamily: fonts[600],
    color: colors.text.secondary,
  },
});
