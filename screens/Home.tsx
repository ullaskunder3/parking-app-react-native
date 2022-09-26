import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, Dimensions } from 'react-native';
import { tostMessage } from '../api/toastMessage';
import { AppContext } from '../Context/AppContext';
const winWidth = Dimensions.get('window').width
const parkingIcon = require('../assets/clipart651598.png')

export default function Home({ navigation }) {

  const {parkingSize, setParkingSize} = useContext(AppContext)

  const changeHandler = (e: string) => {
    if (/^\d+$/.test(e)) {
      setParkingSize(e)
    } else {
      setParkingSize('')
    }
  }

  const submitHandler = async () => {
    const input = String(parkingSize);
    setParkingSize(parkingSize)

    if (input.length != 0) {
      navigation.navigate('Parking Slot')
    }else{
      tostMessage('Input must not be empty');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTopView}>
        <View style={styles.textContainer}>
          <Text style={styles.bigTitleText}>Park It.</Text>
          <Text style={styles.descDummyText}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo quam sunt debitis natus,</Text>
        </View>
        <View style={styles.searchCompnent}>
          <TextInput
            testID='Parking-create-text-input'
            style={styles.input}
            onChangeText={changeHandler}
            value={parkingSize}
            selectionColor={"#0c68be"}
            placeholder={'Enter number of space...'}
            placeholderTextColor={'#a5a5a5'}
            keyboardType={'numeric'} />

          <TouchableHighlight
            testID='Parking-create-submitbutton'
            style={styles.searchBtn}
            onPress={submitHandler}>
            <Text style={styles.searchBtnTxt}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.containerBottomView}>
        <Image resizeMode='center' source={parkingIcon} />
      </View>

      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: 'black'
  },
  containerTopView: {
    width: winWidth,
    paddingVertical: 20,
    marginTop: 50,
    justifyContent: 'space-around'
  },
  textContainer: {
    marginBottom: 50,
    paddingHorizontal: 20
  },
  bigTitleText: {
    color: '#007ac6ef',
    fontWeight: 'bold',
    fontSize: 70,
  },
  descDummyText: {
    color: '#afafaf'
  },
  containerBottomView: {
    flex: 1,
    width: winWidth,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    backgroundColor: '#d3d6ffff',
  },
  searchCompnent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  input: {
    backgroundColor: '#f7f8f81f',
    minWidth: 200,
    color: '#dad8d8',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 9,
    borderTopLeftRadius: 9,
  },
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007ac6ef',
    paddingVertical: 10,
    borderBottomRightRadius: 9,
    borderTopRightRadius: 9,
  },
  searchBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});