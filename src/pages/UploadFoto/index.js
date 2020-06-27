import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import {NoPict} from '../../assets/images';
import {colors, fonts, getData, storeData} from '../../utils';
import Button from '../../components/Button';
import {Label, Gap} from '../../components';
import {IconAddPhoto, IconDelPhoto} from '../../assets/icons';
import ImagePicker from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {Firebase} from '../../config';

const UploadFoto = ({navigation, route}) => {
  const {fullName, profession, uid} = route.params;
  console.log(route.params);
  const [Source, setSource] = useState(NoPict);
  const [AddPhoto, setAddPhoto] = useState(true);
  const [Response, setResponse] = useState('');

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {quality: 0.5, maxHeight: 200, maxWidth: 200},
      response => {
        // Same code as in above section!
        console.log(response);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'Upss.. Sepertinya anda batal memilih foto',
            type: 'danger',
          });
          setSource(NoPict);
          setAddPhoto(true);
        } else {
          setSource({uri: response.uri});
          setAddPhoto(false);
          setResponse(response);
        }
      },
    );
  };

  const getDataLocal = () => {
    getData('user').then(res => {
      console.log(res);
    });
  };

  const uploadAndContinue = () => {
    const data = route.params;
    data.photo = `data:${Response.type};base64, ${Response.data}`;
    Firebase.database()
      .ref(`/users/${uid}/`)
      .update({
        photo: `data:${Response.type};base64, ${Response.data}`,
      })
      .then(() => storeData('user', data))
      .then(() => navigation.replace('MainTab'))
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Header value="Upload Foto" onPress={() => navigation.goBack()} />
        <Gap height={116} />
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.imgWrapper}
            onPress={() => pickImage()}>
            <Image source={Source} alt="picture" style={styles.image} />
            {AddPhoto ? (
              <IconAddPhoto style={styles.addPhoto} />
            ) : (
              <IconDelPhoto style={styles.addPhoto} />
            )}
          </TouchableOpacity>
          <Gap height={26} />
          <Text style={styles.title}>{fullName}</Text>
          <Gap height={4} />
          <Text style={styles.subTitle}>{profession}</Text>
        </View>
        <Gap height={88} />
        {AddPhoto ? (
          <Button value="Upload And Continue" isGray />
        ) : (
          <Button value="Upload And Continue" onPress={uploadAndContinue} />
        )}
        <Gap height={30} />
        <TouchableOpacity onPress={getDataLocal}>
          <Label value="Skip for this" underline center />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadFoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingVertical: 30,
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
    fontSize: 24,
    color: colors.text.secondary,
  },
  subTitle: {
    fontFamily: fonts[500],
    fontSize: 18,
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
});
