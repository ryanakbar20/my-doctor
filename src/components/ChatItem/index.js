import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../utils';

const ChatItem = ({isMe, value, time}) => {
  return (
    <View style={styles.container(isMe)}>
      <View style={styles.content(isMe)}>
        <Text style={styles.text(isMe)}>{value}</Text>
      </View>
      <Text style={styles.time(isMe)}>{time}</Text>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  container: isMe => ({
    alignSelf: isMe ? 'flex-end' : 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 16,
  }),
  content: isMe => ({
    backgroundColor: 'yellow',
    borderRadius: 10,
    borderBottomRightRadius: isMe ? 0 : 10,
    borderBottomLeftRadius: isMe ? 10 : 0,
    padding: 12,
    maxWidth: '70%',
    backgroundColor: isMe ? colors.softGreen : colors.green,
  }),
  text: isMe => ({
    fontSize: 14,
    fontFamily: fonts[400],
    color: isMe ? colors.text.secondary : colors.text.primary,
  }),
  time: isMe => ({
    fontSize: 11,
    fontFamily: fonts[400],
    color: colors.text.secondary,
    marginTop: 8,
    alignSelf: isMe ? 'flex-end' : 'flex-start',
  }),
});
