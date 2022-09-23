import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, Image, View, Button, TouchableOpacity, TouchableHighlight, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function PayScreen({ route }) {
    const { lotID, registeredName, inputHours } = route.params;    
    const payAble = inputHours*10/2
    
    return (
        <View style={styles.container}>
            <Ionicons name="car-sport-sharp" size={100} color="black" />

            <View style={styles.contentWrapper}>
                <View style={styles.payContentText}>
                    <Text style={styles.payContentText1}>Parking Lot ID {lotID}</Text>
                    <Text style={[styles.textCommanStyle]}>Registed Number: {registeredName}</Text>
                    <Text style={[styles.textCommanStyle]}>Cost: {payAble}$</Text>
                </View>

                <TouchableHighlight
                    style={styles.payBtn}
                    onPress={() => Alert.alert('Thank you')}>
                    <Text style={styles.payBtnTxt}>Pay</Text>
                </TouchableHighlight>
            </View>
            <StatusBar style="auto" hidden />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    contentWrapper: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/2,
        justifyContent: 'center',
    },
    payContentText:{
        paddingBottom: 20
    },
    textCommanStyle:{
        color: '#555',
        fontSize: 25
    },
    payContentText1:{
        paddingBottom: 10,
        fontSize: 30,
    },
    payBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007ac6ef',
        paddingVertical: 10,
    },
    payBtnTxt: {
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
});