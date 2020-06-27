import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconSplash} from '../../assets/icons';
import {Button, Gap, InputText, Label, Loading} from '../../components';
import {fonts, colors, useForm, storeData} from '../../utils';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const login = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Firebase.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(success => {
        Firebase.database()
          .ref(`/users/${success.user.uid}/`)
          .once('value')
          .then(resDB => {
            storeData('user', resDB.val());
            dispatch({type: 'SET_LOADING', value: false});
            setForm('reset');
            navigation.replace('MainTab');
          });
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View>
          <IconSplash />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        </View>
        <View>
          <View>
            <Label value="Email Address" mb={6} />
            <InputText
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
          </View>
          <View>
            <Label value="Password" mb={6} mt={24} />
            <InputText
              isPassword
              value={form.password}
              onChangeText={value => setForm('password', value)}
            />
            <TouchableOpacity>
              <Label
                value="Forgot My Password"
                mb={40}
                mt={10}
                fs={12}
                underline
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button value="Sign In" onPress={login} />
          <Gap height={20} />
          <Label
            value="Create New Account"
            center
            underline
            onPress={() => navigation.replace('Register')}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 40,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    marginVertical: 40,
    color: colors.text.secondary,
    fontFamily: fonts[600],
    maxWidth: 153,
  },
});
