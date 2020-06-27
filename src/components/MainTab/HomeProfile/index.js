import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {fonts, colors, getData} from '../../../utils';
import {NoPict} from '../../../assets/images';

const HomeProfile = ({onPress}) => {
  const [profile, setProfile] = useState({
    photo: NoPict,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    getData('user').then(res => {
      res.photo = {uri: res.photo};
      setProfile(res);
    });
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.avatar} source={profile.photo} alt="photo" />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.profession}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts[600],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts[400],
    color: colors.text.light,
    textTransform: 'capitalize',
  },
});
