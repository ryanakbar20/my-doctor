import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconBack, IconAddPhoto, IconBackWhite} from '../../assets/icons';

const IsIcon = ({children, type, onPress}) => {
  if (type == 'BackDark') {
    return (
      <TouchableOpacity onPress={onPress}>
        <IconBack />
      </TouchableOpacity>
    );
  } else if (type == 'BackLight') {
    return (
      <TouchableOpacity onPress={onPress}>
        <IconBackWhite />
      </TouchableOpacity>
    );
  } else if (type == 'AddPhoto') {
    return (
      <TouchableOpacity>
        <IconAddPhoto />
      </TouchableOpacity>
    );
  } else {
    return <TouchableOpacity>{children}</TouchableOpacity>;
  }
};

export default IsIcon;

const styles = StyleSheet.create({});
