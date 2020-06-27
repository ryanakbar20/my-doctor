import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {IconSplash} from '../../assets/icons';
import {Button, Gap} from '../../components';
import {BackgroundImage} from '../../assets/images';
import {fonts, colors} from '../../utils';

const GetStarted = ({navigation}) => {
  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View>
        <IconSplash />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih mudah & fleksibel
        </Text>
      </View>
      <View>
        <Button
          value="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={20} />
        <Button
          isSecondary
          value="Sign In"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    marginTop: 90,
    color: colors.text.primary,
    fontFamily: fonts[600],
    maxWidth: 235,
  },
});
