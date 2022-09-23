import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, StyleSheet, FlatList, View, TextInput, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { tostMessage } from '../api/toastMessage';

function pickRandomFrom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function ParkingSlots({ route, navigation }) {
    const { slots } = route.params;

    const [visible, setVisible] = useState(false);
    const toggleBottomSheet = () => setVisible(!visible);

    const [registeredName, setRegisteredName] = useState<string>('')
    const [inputHours, setInputHours] = useState<string>('')
    const [randomSlot, setRandomSlot] = useState<string[]>([])
    const [copySlot, setCopySlot] = useState<string[]>([...slots])

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

        const randomIdx = pickRandomFrom(0, (copySlot.length - 1))
        const randomID = copySlot[randomIdx];

        let legthOfRegisterName = registeredName.trim().length !== 0;
        let lengthOfHours = inputHours.trim().length !== 0;
        let inputCredentials = (legthOfRegisterName && lengthOfHours)


        if (inputCredentials) {
            if (randomSlot.length < slots.length) {
                if (!randomSlot.includes(randomID)) {
                    // console.log('will push', randomID, !randomSlot.includes(randomID));
                    setRandomSlot(current => [...current, ...[randomID]])
                    setCopySlot(copySlot.filter((o, idx) => randomIdx !== idx))
                } else {
                    tostMessage('Plot is full')
                    console.log("rejected", randomID);
                }
            } else {
                // console.log(slots.filter(elm => randomSlot.includes(elm)));
                // console.log(slots.filter(value => !randomSlot.includes(value)));
                const lastData = slots.filter(value => !randomSlot.includes(value))
                setRandomSlot(current => [...current, ...lastData])

                tostMessage('Plot is full')
            }
        } else {
            tostMessage('Input should not be empty')
        }
        toggleBottomSheet()
    };
    const onPressPayScreen = (parkingLotID)=>{

        navigation.navigate('PayScreen',{lotID: parkingLotID, inputHours, registeredName})
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={slots}
                style={styles.flexListStyle}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.flexItemChild, randomSlot.includes(item) ? { backgroundColor: '#3ae03a' } : null]}>
                            <Text style={{ color: randomSlot.includes(item) ? 'white' : 'black' }}>{item}</Text>
                            {
                                // Click to go to paymentScreen 
                                <Ionicons
                                    onPress={randomSlot.includes(item)?()=>onPressPayScreen(item):()=>(Alert.alert("Register First"))}
                                    name="ios-car-sport-outline"
                                    size={24}
                                    color={randomSlot.includes(item) ? 'white' : 'black'} />
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
                                    style={styles.input}
                                    onChangeText={inputTextChangeHandler}
                                    value={registeredName}
                                    selectionColor={"#0c68be"}
                                    placeholder={'car registration...'}
                                    autoCapitalize="characters"
                                    placeholderTextColor={'#f7f7f7'} />

                                <TouchableHighlight
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
    newRegText:{
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