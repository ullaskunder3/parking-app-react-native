import { StatusBar } from 'expo-status-bar';
import { Text, Image, StyleSheet, FlatList, View, Dimensions } from 'react-native';
const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height

const MAX_TRANSLATE_Y = -10
export default function BottomSheet() {
    return (
        <View style={[styles.container]}>
            <View style={styles.pushDownLine} />
            <View>
                <Text>Ullas</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        top: winHeight,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    pushDownLine: {
        width: 90,
        height: 3,
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: '#555555a8',
        borderRadius: 5
    },
});