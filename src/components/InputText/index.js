import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../utils';

const InputText = ({
  isPassword,
  isChatting,
  placeholder,
  value,
  onChangeText,
  disable,
}) => {
  const [BorderColor, setBorderColor] = useState(colors.input.blur);
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={isPassword ? true : false}
      onBlur={() => setBorderColor(colors.input.blur)}
      onFocus={() => setBorderColor(colors.input.focus)}
      style={styles.container(BorderColor, isChatting)}
      value={value}
      onChangeText={onChangeText}
      selectTextOnFocus={!disable}
      editable={!disable}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: (BorderColor, isChatting) =>
    isChatting
      ? {
          height: 45,
          borderRadius: 10,
          paddingHorizontal: 8,
          paddingVertical: 0,
          backgroundColor: colors.gray100,
          flex: 1,
          marginRight: 10,
        }
      : {
          height: 45,
          borderWidth: 1,
          borderColor: BorderColor,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 0,
        },
});
