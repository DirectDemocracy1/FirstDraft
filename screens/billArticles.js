import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';

const billArticles = ({navigation, route}) => {
  const articleIDs = route.params.articleIDs
  const [dat,setDat] = useState([])
  const userId = route.params.userId

  
useEffect(()=>{

    var articles=[]
    
    articleIDs.forEach(pushFunction)
    
    function pushFunction(value, index, array){
        console.log("dcoum ids, ",value)
        
        firestore()
        .collection("Article")
        .doc(value)
        .onSnapshot(documentSnapshot=>{
            console.log("document  ", documentSnapshot.data().title)
            articles.push({
                'title': documentSnapshot.data().title,
                'key': documentSnapshot.id,
                "hashtags": documentSnapshot.data().hashtags,
                "data": documentSnapshot.data().data

            })
            setDat(articles)

        })
        
    
    }
    //setDat(articles)
    
    console.log("articles", dat)
    
    
    },[])
  return(

    <FlatList
        data={dat}
        renderItem={({item}) => (
          // return a component using that data
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ArticleView', {
                item: item,
                // username: username,
                userId: userId,
              })}
            >
            <View style={styles.listitem}>
              <View style={styles.topPart}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.number} color="white">
                 Hashtags: {item.hashtags}{' '}
                </Text>

              </View>
              {/* <View style={styles.bottomCard}>
                <Text>Comments</Text>
              </View> */}
            </View>
          </TouchableOpacity>
        )}
      />
)
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  listitem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 22,
    marginTop: 25,
    height: 160,
    width: '100%',
    color: 'white',
    //marginLeft:20
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    opacity: 1,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  },
  number: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  avatar: {
    paddingLeft: 50,
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: 'grey',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 170,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  appButtonContainer2: {
    elevation: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 170,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  endDate: {
    position: 'absolute',
    left: 275,
    fontSize: 18,
    top: 125,
    color: 'white',
  },
  appButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  topPart: {
    backgroundColor: '#537A5A',
    height: 160,
    width: '100%',
    // borderBottomLeftRadius: number,
    // borderBottomRightRadius: number,
    borderRadius: 20,
    color: 'white',
  },
  bottomCard: {
    flexDirection: 'row',
    top: 350,
    left: 200,
  },
});
export default billArticles;
