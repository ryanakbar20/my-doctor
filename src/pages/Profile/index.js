import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import {
  NoPict,
  EditProfile,
  Language,
  GiveUs,
  HelpCenter,
} from '../../assets/images';
import {colors, fonts, getData} from '../../utils';
import {Gap, ListDoctor} from '../../components';
import {Doctor1} from '../../assets/dummy/images';
import DataJson from '../../assets/dummy/data.json';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';

const Profile = ({navigation}) => {
  const [Profile, setProfile] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      res.photo = {uri: res.photo};
      setProfile(res);
    });
  }, []);

  const logout = () => {
    Firebase.auth()
      .signOut()
      .then(() => navigation.replace('GetStarted'))
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Header value="Upload Foto" onPress={() => navigation.goBack()} />
        <Gap height={40} />
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.imgWrapper}>
            {Profile.photo ? (
              <Image
                source={Profile.photo}
                alt="picture"
                style={styles.image}
              />
            ) : (
              <Image source={NoPict} alt="picture" style={styles.image} />
            )}
          </TouchableOpacity>
          <Gap height={16} />
          <Text style={styles.title}>{Profile.fullName}</Text>
          <Gap height={2} />
          <Text style={styles.subTitle}>{Profile.profession}</Text>
        </View>
        <Gap height={14} />
        <View style={styles.listItem}>
          <ListDoctor
            next
            min
            pict={EditProfile}
            name="Edit Profile"
            desc="Last updated yesterday"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <ListDoctor
            next
            min
            pict={Language}
            name="Language"
            desc="Available 12 languages"
          />
          <ListDoctor
            next
            min
            pict={GiveUs}
            name="Give Us Rate"
            desc="On Google Play Store"
          />
          <ListDoctor
            next
            min
            pict={HelpCenter}
            name="Logout"
            desc="Read our guidelines"
            onPress={logout}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: colors.white,
  },
  imgWrapper: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: colors.gray100,
    borderRadius: 130 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  title: {
    fontFamily: fonts[600],
    fontSize: 20,
    color: colors.text.secondary,
  },
  subTitle: {
    fontFamily: fonts[500],
    fontSize: 16,
    color: colors.text.light,
  },
  wrapper: {
    alignItems: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  listItem: {
    marginHorizontal: -24,
  },
});
