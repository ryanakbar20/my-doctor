import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListDoctor, Gap} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {Firebase} from '../../config';

const Messages = ({navigation}) => {
  const [DataUser, setDataUser] = useState({});
  const [Messages, setMessages] = useState([]);
  useEffect(() => {
    getData('user').then(res => setDataUser(res));
    Firebase.database()
      .ref(`messages/${DataUser.uid}`)
      .on('value', async snapshot => {
        if (snapshot.val()) {
          const dataOld = snapshot.val();
          const data = [];
          const promise = Object.keys(dataOld).map(async key => {
            const detailDoctor = await Firebase.database()
              .ref(`doctors/${dataOld[key].uidPartner}`)
              .once('value');
            data.push({
              id: key,
              ...dataOld[key],
              detailDoctor: detailDoctor.val(),
            });
          });
          await Promise.all(promise);
          setMessages(data);
          console.log(data);
        }
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Messages</Text>
        {Messages.map(item => {
          return (
            <ListDoctor
              name={item.detailDoctor.fullName}
              desc={item.lastContentChat}
              key={item.id}
              pict={item.detailDoctor.photo}
              onPress={() => navigation.navigate('Chatting', item.detailDoctor)}
            />
          );
        })}
        <ListDoctor name="sadmkdaslmal" desc="sacdssdsd" />
        <Gap height={30} />
      </ScrollView>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    flex: 1,
  },
  page: {
    backgroundColor: colors.white,
    paddingTop: 30,
    paddingHorizontal: 16,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts[600],
    color: colors.text.secondary,
  },
});
