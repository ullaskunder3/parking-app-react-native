import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, FlatList, View, TextInput, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { tostMessage } from '../api/toastMessage';
import { AppContext } from '../Context/AppContext';

export default function ParkingSlots({ navigation, route }) {
    const { parkingSlots, setParkingSlots, parkingSize } = useContext(AppContext)

    const [visible, setVisible] = useState(false);
    const toggleBottomSheet = () => setVisible(!visible);

    const [registeredName, setRegisteredName] = useState<string>('')
    const [inputHours, setInputHours] = useState<string>('')

    const keys = Object.keys(parkingSlots);
    const randomProp = keys[Math.floor(Math.random() * keys.length)];

    function setArrayOfSlots(params: number) {
        for (let i = 0; i < params; i++) {
            let r: any = Math.floor(Math.random() * 100) + 1;
            setParkingSlots(prevState => ({ ...prevState, ...{ [`S${r}`]: { isAllocated: false } } }))
        }
    }

    useEffect(() => {
        setArrayOfSlots(parkingSize)

        return () => {
            console.log('unmount');
        }
    }, [parkingSize, route.params?.lotID])

    const inputTextChangeHandler = (e: string) => {
        setRegisteredName(e);
    }

    const inputHoursChangeHandler = (e: any) => {
        if (/^\d+$/.test(e)) {
            setInputHours(e)
        } else {
            setInputHours('')
        }
    };

    const onSubmitHandler = () => {

        let legthOfRegisterName = registeredName.trim().length !== 0;
        let lengthOfHours = inputHours.trim().length !== 0;
        let inputCredentials = (legthOfRegisterName && lengthOfHours)

        if (inputCredentials) {
            
            if (parkingSlots.hasOwnProperty(randomProp)) {
                parkingSlots[randomProp].isAllocated = true
            }
            const allAllocated = Object.values(parkingSlots).every((prop: any) => prop.isAllocated)
            if (allAllocated) { tostMessage('Plot is full') }

        } else {
            tostMessage('Input should not be empty')
        }
        console.log("rabdimID AFTER", randomProp, "the obj", parkingSlots);
        toggleBottomSheet()
    };
    // deallocation of slots
    if (route?.params?.lotID) {
        const { lotID } = route.params
        if (parkingSlots.hasOwnProperty(lotID)) {
            parkingSlots[lotID].isAllocated = false
        }
    }
    const onPressPayScreen = (parkingLotID) => {

        navigation.navigate('PayScreen', { lotID: parkingLotID, inputHours, registeredName })
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(parkingSlots)}
                style={styles.flexListStyle}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View testID='parking-drawing-space-<space-number>' style={[styles.flexItemChild, parkingSlots[item].isAllocated ? { backgroundColor: '#3ae03a' } : null]}>
                            <Text testID='parking-drawing-spacenumber-<space_number>' style={{ color: parkingSlots[item].isAllocated ? 'white' : 'black' }}>{item}</Text>
                            {
                                // Click to go to paymentScreen 
                                <Ionicons
                                    onPress={parkingSlots[item].isAllocated
                                        ? () => onPressPayScreen(item)
                                        : () => (Alert.alert("Register First"))}
                                    name="ios-car-sport-outline"
                                    size={24}
                                    color={parkingSlots[item].isAllocated ? 'white' : 'black'} />
                            }
                        </View>
                    )
                }}
            />
            <View style={styles.detailBtn}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.touchableOpacityStyle}
                    onPress={toggleBottomSheet}>
                    <Text>Enter Vehicle details</Text>
                </TouchableOpacity>
            </View>
            <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomSheet}
                onBackdropPress={toggleBottomSheet}>
                <View style={styles.bottomSheetStyle}>
                    <View>
                        <Text style={styles.newRegText}>
                            New registration
                        </Text>
                        <View style={styles.inputComponentContainer}>

                            <TextInput
                                style={styles.inputHoursComponent}
                                onChangeText={(num) => inputHoursChangeHandler(num)}
                                keyboardType={'numeric'}
                                selectionColor={"#0c68be"}
                                placeholder={'Hours'}
                                value={inputHours}
                                maxLength={12}
                                placeholderTextColor={'#f7f7f7'} />

                            <View style={styles.inputComponent}>
                                <TextInput
                                    testID='parking-drawingregistration-input'
                                    style={styles.input}
                                    onChangeText={inputTextChangeHandler}
                                    value={registeredName}
                                    selectionColor={"#0c68be"}
                                    placeholder={'car registration...'}
                                    autoCapitalize="characters"
                                    placeholderTextColor={'#f7f7f7'} />

                                <TouchableHighlight
                                    testID='parking-drawing-addcarbutton'
                                    style={styles.searchBtn}
                                    onPress={onSubmitHandler}>
                                    <Text style={styles.searchBtnTxt}>Submit</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
            </BottomSheet>
            <StatusBar style="auto" hidden />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36435f'
    },
    flexListStyle: {
        marginTop: 10,
        flex: 1,
    },
    flexItemChild: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: 15,
        marginVertical: 15,
        borderRadius: 50,
        backgroundColor: '#eff9fc'
    },
    detailBtn: {
        marginHorizontal: 35,
    },
    newRegText: {
        textAlign: 'center',
        paddingBottom: 50,
        fontSize: 20,
    },
    touchableOpacityStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        bottom: 30,
        borderRadius: 10,
        paddingVertical: 10,
    },
    bottomSheetStyle: {
        backgroundColor: '#fff',
        // width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    inputComponentContainer: {
        flexDirection: 'row',
    },
    inputComponent: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: '#00000042',
        color: '#020202',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        borderBottomLeftRadius: 9,
        borderTopLeftRadius: 9,
    },
    inputHoursComponent: {
        backgroundColor: '#00000042',
        minWidth: 50,
        color: '#020202',
        fontWeight: 'bold',
        paddingHorizontal: 15,
        borderRadius: 50
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