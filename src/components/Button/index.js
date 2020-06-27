import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IsIcon from './IsIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fonts, colors} from '../../utils';
import {ICSendDisable, ICSendEnable} from '../../assets/icons';

const Button = ({
  value,
  isSecondary,
  isGray,
  isIcon,
  type,
  onPress,
  isSend,
  enable,
}) => {
  return isSend ? (
    <View>
      {enable ? (
        <TouchableOpacity
          onPress={onPress}
          style={styles.containerSend(enable)}>
          <ICSendEnable style={styles.iconSend} />
        </TouchableOpacity>
      ) : (
        <View style={styles.containerSend(enable)}>
          <ICSendDisable style={styles.iconSend} />
        </View>
      )}
    </View>
  ) : isIcon ? (
    <IsIcon type={type} onPress={onPress} />
  ) : isGray ? (
    <View style={styles.container(isSecondary, isGray)}>
      <Text style={styles.title(isSecondary, isGray)}>{value}</Text>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container(isSecondary, isGray)}>
        <Text style={styles.title(isSecondary, isGray)}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (isSecondary, isGray) => ({
    backgroundColor: isGray
      ? colors.gray100
      : isSecondary
      ? colors.white
      : colors.green,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  }),
  title: (isSecondary, isGray) => ({
    color: isGray
      ? colors.text.light
      : isSecondary
      ? colors.text.secondary
      : colors.text.primary,
    fontSize: 18,
    fontFamily: fonts[600],
  }),
  containerSend: enable => ({
    backgroundColor: enable ? colors.blue2 : colors.gray100,
    height: 45,
    width: 45,
    borderRadius: 10,
  }),
  iconSend: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
