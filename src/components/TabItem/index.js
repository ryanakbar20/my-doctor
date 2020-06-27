import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  IconDoctor,
  IconMessages,
  IconHospitals,
  IconDoctorActive,
  IconMessagesActive,
  IconHospitalsActive,
} from '../../assets/icons';
import {colors, fonts} from '../../utils';
import Gap from '../Gap';

const TabIcon = ({title, isFocused}) => {
  if (title == 'Doctor') {
    return isFocused ? <IconDoctorActive /> : <IconDoctor />;
  }
  if (title == 'Messages') {
    return isFocused ? <IconMessagesActive /> : <IconMessages />;
  }
  if (title == 'Hospitals') {
    return isFocused ? <IconHospitalsActive /> : <IconHospitals />;
  }
  return <IconDoctor />;
};

const TabItem = ({onPress, onLongPress, title, isFocused}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        <View style={styles.content}>
          <TabIcon title={title} isFocused={isFocused} />
          <Gap height={4} />
          <Text style={styles.text(isFocused)}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: isFocused => ({
    color: isFocused ? colors.text.green : colors.text.dark,
    fontFamily: fonts[600],
    fontSize: 10,
  }),
});
