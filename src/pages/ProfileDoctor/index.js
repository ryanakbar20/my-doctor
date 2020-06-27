import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Description, Header, Gap, Button} from '../../components';
import {colors, fonts} from '../../utils';
import {Doctor2} from '../../assets/dummy/images';
import {ICMale} from '../../assets/icons';
import DataJson from '../../assets/dummy/data.json';

const ProfileDoctor = ({navigation, route}) => {
  const data = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View>
          <Header value="Profile" onPress={() => navigation.goBack()} />
          <Gap height={40} />
          <View style={styles.wrapper}>
            <TouchableOpacity style={styles.imgWrapper}>
              <Image
                source={{uri: data.photo}}
                alt="picture"
                style={styles.image}
              />
              <ICMale style={styles.icon} />
            </TouchableOpacity>
            <Gap height={16} />
            <Text style={styles.title}>{data.fullName}</Text>
            <Gap height={2} />
            <Text style={styles.subTitle}>{data.category}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Description name="Alumnus" desc={data.university} />
          <Description name="Tempat Praktik" desc={data.hospital_address} />
          <Description name="No. STR" desc={data.str_number} />
        </View>
        <Button
          value="Start Consultation"
          onPress={() => navigation.replace('Chatting', data)}
        />
      </View>
    </View>
  );
};

export default ProfileDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 40,
    paddingBottom: 40,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
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
    textTransform: 'capitalize',
  },
  subTitle: {
    fontFamily: fonts[500],
    fontSize: 16,
    color: colors.text.light,
    textTransform: 'capitalize',
  },
  wrapper: {
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  description: {
    marginHorizontal: -24,
  },
});
