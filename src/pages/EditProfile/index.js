import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import {colors, fonts, getData, storeData} from '../../utils';
import {Gap, Label, InputText, Button} from '../../components';
import {NoPict} from '../../assets/images';
import {Firebase} from '../../config';
import {IconDelPhoto, IconAddPhoto} from '../../assets/icons';
import ImagePicker from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

const Profile = ({navigation}) => {
  const [Profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photo: NoPict,
  });

  const [Password, setPassword] = useState('');
  const [AddPhoto, setAddPhoto] = useState(true);

  useEffect(() => {
    getData('user').then(res => {
      res.photo = {uri: res.photo};
      setProfile(res);
      setAddPhoto(false);
    });
  }, []);

  const onChange = (key, value) => {
    setProfile({
      ...Profile,
      [key]: value,
    });
  };

  const selectPhoto = () => {
    ImagePicker.launchImageLibrary(
      {maxHeight: 200, maxWidth: 200, quality: 0.5},
      response => {
        if (response.didCancel) {
          showMessage({
            message: 'Upss.. Sepertinya anda batal memilih foto',
            type: 'danger',
          });
          setProfile({
            ...Profile,
            photo: NoPict,
          });
          setAddPhoto(true);
        } else {
          setProfile({
            ...Profile,
            photo: {uri: `data:${response.type};base64, ${response.data}`},
          });
          setAddPhoto(false);
        }
      },
    );
  };

  const updatePassword = () => {
    // Firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     user.updatePassword(Password).catch(err => {
    //       showMessage({
    //         message: err.message,
    //         type: 'danger',
    //       });
    //     });
    //   }
    // });
    const user = Firebase.auth().currentUser;
    user.updatePassword(Password).catch(error => {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    });
  };

  const updateProfile = () => {
    const data = Profile;
    data.photo = data.photo.uri;
    Firebase.database()
      .ref(`/users/${Profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data);
        navigation.replace('MainTab');
      });
  };

  const onUpdate = () => {
    if (Password.length > 0) {
      if (Password.length < 6) {
        showMessage({
          message: 'Password anda harus lebih dari 6 karakter',
          type: 'danger',
        });
      } else {
        updatePassword();
        updateProfile();
        navigation.replace('MainTab');
      }
    } else {
      updateProfile();
      navigation.replace('MainTab');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Header value="Update Profile" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.inner}>
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.imgWrapper} onPress={selectPhoto}>
            <Image source={Profile.photo} alt="picture" style={styles.image} />
            {AddPhoto ? (
              <IconAddPhoto style={styles.addPhoto} />
            ) : (
              <IconDelPhoto style={styles.addPhoto} />
            )}
          </TouchableOpacity>
        </View>
        <Gap height={30} />
        <View style={styles.listItem}>
          <View>
            <Label value="Full Name" mb={6} />
            <InputText
              value={Profile.fullName}
              onChangeText={value => onChange('fullName', value)}
            />
          </View>
          <Gap height={24} />
          <View>
            <Label value="Profession" mb={6} />
            <InputText
              value={Profile.profession}
              onChangeText={value => onChange('profession', value)}
            />
          </View>
          <Gap height={24} />
          <View>
            <Label value="Email Address" mb={6} />
            <InputText value={Profile.email} disable />
          </View>
          <Gap height={24} />
          <View>
            <Label value="Password" mb={6} />
            <InputText
              isPassword
              value={Password}
              onChangeText={value => setPassword(value)}
            />
          </View>
          <Gap height={30} />
          <Button value="Save Profile" onPress={onUpdate} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inner: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
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
  addPhoto: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  header: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: colors.white,
  },
});
