import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, InputText, Button, ChatItem, Label} from '../../components';
import {colors, fonts, getData, chatTime, chatDate} from '../../utils';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';

const Chatting = ({route}) => {
  const data = route.params;
  const [ChatContent, setChatContent] = useState('');
  const [DataUser, setDataUser] = useState('');
  const [DataChat, setDataChat] = useState([]);
  useEffect(() => {
    getDataUserFromLocal();
    Firebase.database()
      .ref(`chatting/${DataUser.uid}_${data.uid}/allChat/`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const dataOld = snapshot.val();
          const chatDate = [];
          Object.keys(dataOld).map(key => {
            const dataChat = dataOld[key];
            const newDataChat = [];
            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });
            chatDate.push({
              id: key,
              data: newDataChat,
            });
          });
          setDataChat(chatDate);
          console.log(DataChat);
        }
      });
  }, []);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setDataUser(res);
    });
  };

  const chatPush = {
    sendBy: DataUser.uid,
    chatDate: new Date().getTime(),
    chatTime: chatTime,
    chatContent: ChatContent,
  };
  const chatId = `${DataUser.uid}_${data.uid}`;
  const urlFirebase = `chatting/${chatId}/allChat/${chatDate}/`;
  const urlMessageUser = `messages/${DataUser.uid}/${chatId}/`;
  const urlMessageDoctor = `messages/${data.uid}/${chatId}/`;
  const dataHistoryChatUser = {
    lastContentChat: ChatContent,
    lastChatDate: new Date().getTime(),
    uidPartner: data.uid,
  };
  const dataHistoryChatDoctor = {
    lastContentChat: ChatContent,
    lastChatDate: new Date().getTime(),
    uidPartner: DataUser.uid,
  };

  const sendChat = () => {
    setChatContent('');
    Firebase.database()
      .ref(urlFirebase)
      .push(chatPush)
      .then(() => {
        Firebase.database()
          .ref(urlMessageUser)
          .set(dataHistoryChatUser)
          .catch(err =>
            showMessage({
              message: err.message,
              type: 'danger',
            }),
          );
        Firebase.database()
          .ref(urlMessageDoctor)
          .set(dataHistoryChatDoctor)
          .catch(err =>
            showMessage({
              message: err.message,
              type: 'danger',
            }),
          );
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'danger',
        });
      });
  };
  return (
    <View style={styles.container}>
      <Header
        isChatting
        isWhite
        desc={data.profession}
        value={data.fullName}
        pict={data.photo}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {DataChat.map(item => {
            return (
              <View key={item.id}>
                <Text style={styles.date}>{item.id}</Text>
                {item.data.map(chat => {
                  return (
                    <ChatItem
                      isMe={chat.data.sendBy === DataUser.uid}
                      value={chat.data.chatContent}
                      time={chat.data.chatTime}
                      key={chat.id}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.inputText}>
        <InputText
          value={ChatContent}
          isChatting
          placeholder={`Tulis pesan untuk ${data.fullName}`}
          onChangeText={value => setChatContent(value)}
        />
        <Button isSend enable={ChatContent.length > 0} onPress={sendChat} />
      </View>
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  inputText: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  date: {
    fontSize: 12,
    fontFamily: fonts[400],
    color: colors.text.light,
    marginVertical: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
  },
});
