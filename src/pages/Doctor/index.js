import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  HomeProfile,
  DoctorCategory,
  RatedDoctor,
  NewsItem,
  Gap,
} from '../../components';
import {fonts, colors, getData} from '../../utils';
import {Firebase} from '../../config';

const Doctor = ({navigation}) => {
  const [Category, setCategory] = useState([]);
  const [News, setNews] = useState([]);
  const [Doctor, setDoctor] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getNews();
    getRatedDoctor();
  }, []);

  const getCategoryDoctor = () => {
    Firebase.database()
      .ref('/category-doctor/')
      .once('value')
      .then(res => {
        setCategory(res.val());
      });
  };

  const getNews = () => {
    Firebase.database()
      .ref('/news/')
      .once('value')
      .then(res => {
        setNews(res.val());
      });
  };

  const getRatedDoctor = () => {
    Firebase.database()
      .ref('/doctors/')
      .limitToLast(3)
      .once('value')
      .then(res => {
        const oldData = res.val();
        const data = [];
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        setDoctor(data);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeProfile onPress={() => navigation.navigate('Profile')} />
          <Gap height={30} />
          <Text style={styles.titleCategory}>
            Mau konsultasi dengan siapa hari ini?
          </Text>
          <View style={styles.wrapper}>
            <ScrollView horizontal>
              <View style={styles.doktorCategory}>
                <Gap width={16} />
                {Category.map(item => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      value={item.name}
                      onPress={() => navigation.navigate('ListDoctor', item)}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <Gap height={30} />
          <Text style={styles.title}>Top Rated Doctor</Text>
          {Doctor.map(item => {
            return (
              <RatedDoctor
                pict={item.data.photo}
                name={item.data.fullName}
                desc={item.data.category}
                key={item.id}
                onPress={() => navigation.navigate('ProfileDoctor', item.data)}
              />
            );
          })}
          <Gap height={30} />
          <Text style={styles.title}>Good News</Text>
          {News.map(item => {
            return (
              <NewsItem
                title={item.title}
                time={item.date}
                pict={item.image}
                key={item.id}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  page: {
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleCategory: {
    fontSize: 20,
    fontFamily: fonts[600],
    color: colors.text.secondary,
    maxWidth: 210,
  },
  doktorCategory: {
    flexDirection: 'row',
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts[600],
    color: colors.text.secondary,
  },
  wrapper: {
    marginHorizontal: -16,
  },
});
