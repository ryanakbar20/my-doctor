import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {fonts, colors} from '../../../utils';

const NewsItem = ({title, time, pict}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{time}</Text>
      </View>
      <Image style={styles.image} source={{uri: pict}} alt="news" />
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  title: {
    fontFamily: fonts[600],
    color: colors.text.secondary,
    fontSize: 16,
    maxWidth: 177,
  },
  subTitle: {
    fontFamily: fonts[400],
    color: colors.text.light,
    fontSize: 12,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 10,
  },
});
