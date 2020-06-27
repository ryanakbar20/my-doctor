import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Gap from '../Gap';
import Button from '../Button';
import {fonts, colors} from '../../utils';
import {Doctor2} from '../../assets/dummy/images';

const Header = ({value, onPress, isWhite, isChatting, desc, pict}) => {
  return (
    <View style={styles.container(isChatting)}>
      <Button
        isIcon
        type={isWhite ? 'BackLight' : 'BackDark'}
        onPress={onPress}
      />
      <View style={styles.content}>
        <Text style={styles.title(isWhite)}>{value}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {isChatting ? (
        <Image style={styles.image} source={{uri: pict}} alt="Picture" />
      ) : (
        <Gap width={16} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: isChatting =>
    isChatting
      ? {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 26,
          backgroundColor: colors.darkBlue,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }
      : {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
  title: isWhite => ({
    fontSize: 20,
    color: isWhite ? colors.text.primary : colors.text.secondary,
    fontFamily: fonts[600],
    textTransform: 'capitalize',
  }),
  image: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
  desc: {
    fontSize: 14,
    color: colors.text.light,
    fontFamily: fonts[400],
    textTransform: 'capitalize',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
