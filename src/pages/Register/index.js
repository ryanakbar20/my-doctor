import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Gap, InputText, Label, Header, Loading} from '../../components';
import {colors, useForm, storeData, getData} from '../../utils';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [form, setform] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });
  const onContinue = () => {
    setLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        setform('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };
        Firebase.database()
          .ref(`/users/${success.user.uid}/`)
          .set(data);
        navigation.navigate('UploadFoto', data);
      })
      .catch(error => {
        setLoading(false);
        showMessage({
          message: error.message,
          type: 'danger',
        });
        console.log('Register Gagal : ', error.message);
      });
    // const data = {
    //   fullName: form.fullName,
    //   profession: form.profession,
    //   email: form.email,
    // };
    // navigation.navigate('UploadFoto', data);
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inner}>
          <View>
            <Header onPress={() => navigation.goBack()} value="Daftar Akun" />
            <Gap height={40} />
          </View>
          <View>
            <View>
              <Label value="Full Name" mb={6} />
              <InputText
                value={form.fullName}
                onChangeText={value => setform('fullName', value)}
              />
            </View>
            <View>
              <Label value="Profession" mt={24} mb={6} />
              <InputText
                value={form.profession}
                onChangeText={value => setform('profession', value)}
              />
            </View>
            <View>
              <Label value="Email Address" mt={24} mb={6} />
              <InputText
                value={form.email}
                onChangeText={value => setform('email', value)}
              />
            </View>
            <View>
              <Label value="Password" mb={6} mt={24} />
              <InputText
                isPassword
                value={form.password}
                onChangeText={value => setform('password', value)}
              />
              <Gap height={50} />
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Button value="Continue" onPress={() => onContinue()} />
            </TouchableOpacity>
            <Gap height={45} />
          </View>
        </View>
      </KeyboardAvoidingView>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
  },
});
