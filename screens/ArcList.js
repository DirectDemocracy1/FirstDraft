/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';

const ArcList = ({navigation, route}) => {
  const userId = route.params.userId;
  const namex = route.params.name;
  const [dat, setDat] = useState([]);
  const [load, setLoad] = useState(true);
  const [tags, setTags] = useState([]);
  const [userKey, setUserKey] = useState({});
  const [updated, setUpdated] = useState([]);
  const liked = item => {
    console.log('likedd', item);
    setUserKey(item);
    firestore()
      .collection('Article')
      .doc(item.key)
      .update({
        likes: item.likes + 1,
      });
    // firestore()
    //   .collection('Users')
    //   .doc(userId)
    //   .onSnapshot(documentSnapshot => {
    //     setTags(documentSnapshot.data().tags);
    //     console.log('ho');
    //     setusertrigger(!usetrigger);
    //   });
    item.hashtags.map(tag => {
      firestore()
        .collection('Users')
        .doc(userId)
        .update({
          tags: firestore.FieldValue.arrayUnion(tag),
        });
    });
  };
  const disliked = item => {
    console.log('disssss', item);
    firestore()
      .collection('Article')
      .doc(item.key)
      .update({
        dislikes: item.dislikes + 1,
      });
  };
  useEffect(() => {
    console.log('helllllll');
    if (tags !== []) {
      fetch('http://10.0.2.2:5000/', {
        method: 'POST',
        headers: {
          //   'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John',
          password: 'John123',
          data: dat,
          utags: tags,
        }),
      })
        .then(response => response.json())
        .then(json => {
          //console.log("returned data: " + json);
          setUpdated(json);

          console.log(updated);
          setLoad(false);
        });
    }
  }, [load, tags]);
  useEffect(() => {
    console.log(userId);
    const art = firestore()
      .collection('Article')
      .get()
      .then(collectionSnapshot => {
        var bills = [];
        collectionSnapshot.forEach(documentSnapshot => {
          bills.push({
            key: documentSnapshot.id,
            title: documentSnapshot.data().title,
            data: documentSnapshot.data().data,
            likes: documentSnapshot.data().likes,
            dislikes: documentSnapshot.data().dislikes,
            hashtags: documentSnapshot.data().hashtags,
            uname: documentSnapshot.data().uname,
          });
        });

        setDat(bills);

        firestore()
          .collection('Users')
          .doc(userId)
          .onSnapshot(documentSnapshot => {
            setTags(documentSnapshot.data().tags);
            //console.log('User data: ',tags);
          });
        console.log('User data: ', tags);
      });
    return () => art;
  }, []);
  if (load) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello
        {tags}
      </Text>
      <FlatList
        data={updated}
        renderItem={({item}) => (
          // return a component using that data
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ArticleView', {item: item, userId: namex})
            }>
            <View style={styles.listitem}>
              <View>
                <Text style={styles.title}>Title: {item.title}</Text>

                <Text style={styles.number}>
                  BY {item.uname} {'\n'}
                  <Text>Likes:{item.likes}</Text> {'\n'}
                  <Text>dislikes:{item.dislikes}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.ButtonDistribution}>
              {/* <Button title="Like" color="green" onPress={() => liked(item)} />
              <Button
                title="Dislike"
                color="red"
                onPress={() => disliked(item)}
              /> */}
              <TouchableOpacity
                onPress={liked}
                style={styles.appButtonContainer1}>
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={disliked}
                style={styles.appButtonContainer3}>
                <Text style={styles.buttonText}>Dislike</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'black',
  },
  listitem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 160,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    opacity: 1,
  },
  title: {
    //flex:1,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  number: {
    paddingTop: 7,
    color: 'black',
    fontSize: 16,
  },
  avatar: {
    paddingLeft: 50,
  },
  likeDislikeTemp: {
    color: 'white',
  },
  ButtonDistribution: {
    flex: 1,
    flexDirection: 'row',
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: '#81B581',
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 12,
    width: 160,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  appButtonContainer3: {
    elevation: 8,
    backgroundColor: '#CF3C3C',
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 12,
    width: 160,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
});
export default ArcList;
