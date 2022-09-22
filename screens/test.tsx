import { StatusBar } from 'expo-status-bar';
import { Text, Image, StyleSheet, FlatList, View, Dimensions } from 'react-native';
const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height

const slot = [
  { key: 'A1' }, { key: 'A2' }, { key: 'A3' }, { key: 'A4' }, { key: 'A5' }, { key: 'A6' }, { key: 'A7' }, { key: 'A8' }, { key: 'A9' }, { key: 'A10' },
];
const carIcon = require('../assets/caricon.jpg')

export default function ParkingSlot() {
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Image style={styles.itemIcon} resizeMode='center' source={carIcon} />
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={slot}
        style={styles.container}
        renderItem={renderItem}
      />
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