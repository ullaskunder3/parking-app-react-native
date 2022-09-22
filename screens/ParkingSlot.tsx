import { StatusBar } from 'expo-status-bar';
import { Text, Image, StyleSheet, FlatList, View, Dimensions, Animated } from 'react-native';
import Slots from './Slots';
const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height
import Paginator from './Paginator';
import { useRef } from 'react';

const carIcon = require('../assets/caricon.jpg')

export default function ParkingSlot({route}) {
  console.log("params:",route.params);

  const slot = [
    { key: 'A1' }, { key: 'A2' }, { key: 'A3' }
  ];
  
  const scrollX = useRef(new Animated.Value(0)).current
  const renderItem = ({ item }) => {
    return (
      <Slots item={item} />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={slot}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        keyExtractor={(item)=>item.key}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: false
        })}
      />
      <Paginator slot={slot} scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  item: {
    backgroundColor: '#c2e1e23f',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
    width: 150,
    height: 90,
    transform: [
      { scaleX: -1 }
    ]
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemIcon:{
    // width: 30
  },
  itemText: {
    backgroundColor: 'green',
    color: '#1d1d1d',
  },
});