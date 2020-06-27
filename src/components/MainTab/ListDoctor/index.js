import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';
import {ICNext} from '../../../assets/icons';

const MessageList = ({name, desc, pict, next, onPress, min}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.page}>
      <View style={styles.container}>
        <Image style={styles.image(min)} source={{uri: pict}} alt="pict" />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{desc}</Text>
        </View>
      </View>
      {next ? <ICNext /> : <View />}
    </TouchableOpacity>
  );
};

export default MessageList;

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
  image: min => ({
    width: min ? 30 : 46,
    height: min ? 30 : 46,
    borderRadius: min ? 30 / 2 : 46 / 2,
    marginRight: 12,
  }),
  title: {
    fontSize: 16,
    fontFamily: fonts[400],
    color: colors.text.secondary,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: fonts[300],
    color: colors.text.light,
  },
});
