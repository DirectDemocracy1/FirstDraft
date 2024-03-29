import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

export default function Hompage({route, navigation}) {
  const mail = route.params.email;
  const [loading, setloading] = useState(true);
  const [name, setname] = useState('');
  const [userId, setuserId] = useState('');
  const usersCollection = firestore()
    .collection('Users')
    .where('Email', '==', mail)
    .get()
    .then(collectionSnapshot => {
      collectionSnapshot.forEach(documentSnapshot => {
        console.log(
          'User ID: ',
          documentSnapshot.id,
          documentSnapshot.data().Name,
        );
        setname(documentSnapshot.data().Name);
        setuserId(documentSnapshot.id);
        setloading(false);
      });
    });

  if (loading) {
    return <ActivityIndicator />;
  } else {
    navigation.navigate('View', {name: name, userId: userId});
  }

  return (
    <View>
      <View style={styles.bottomTabNavigator}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('View', {name: name, userId: userId})
          }
          style={styles.ButtonOP}>
          <Text style={styles.text}>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ArcList', {userId: userId, name: name})
          }
          style={styles.ButtonOP}>
          <Text style={styles.text}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {name: name, userId: userId})
          }
          style={styles.ButtonOP}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminLogin')}
          style={styles.ButtonOP}>
          <Text style={styles.text}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bottomTabNavigator: {
    flexDirection: 'row',
    color: 'black',
    backgroundColor: '#18A999',
    position: 'absolute',
    top: 620,
    width: '100%',
    height: 60,
    borderRadius: 20,
  },
  ButtonOP: {
    paddingRight: 35,
    paddingLeft: 20,
    paddingTop: 17,
  },
  text: {
    color: '#FFFFF2',
    fontSize: 17,
    fontWeight: '600',
  },
});
