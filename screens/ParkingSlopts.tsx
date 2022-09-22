import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, FlatList, View, Dimensions, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height
import { Ionicons } from '@expo/vector-icons';
const carIcon = require('../assets/caricon.jpg')
import { BottomSheet } from 'react-native-btr';
import { tostMessage } from '../api/toastMessage';

function pickRandomFrom(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const MAX_ROW = 6
export default function ParkingSlots({ route }) {
    const { slots } = route.params;
    let newSlots = [...slots];

    const [visible, setVisible] = useState(false);
    const toggleBottomSheet = () => {
        setVisible(!visible);
    };
    const [registeredName, setRegisteredName] = useState<string>('')
    const [inputHours, setInputHours] = useState<string>('')
    const [randomSlot, setRandomSlot] = useState<string[]>([])

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
    const getRandomSlot = () => {
        const randomIdx = pickRandomFrom(1, (slots.length - 1))
        const randomID = newSlots[randomIdx];
        return { randomID }
    }
    const onSubmitHandler = () => {

        let { randomID } = getRandomSlot();

        let legthOfRegisterName = registeredName.trim().length !== 0;
        let lengthOfHours = inputHours.trim().length !== 0;
        let inputCredentials = (legthOfRegisterName && lengthOfHours)

        console.log('randomSlot.length < slots.length ', randomSlot.length, slots.length);

        // if (inputCredentials) {
        //     if(!(randomSlot.length < MAX_LENGTH)){
        //         console.log('!randomSlot.length > slots.length', !(randomSlot.length > slots.length));
                
        //         console.log("compare: < 1;",randomSlot);
        //         console.log("compare: < 1;",slots);
 
        //         if(!randomSlot.includes(randomID) && (randomSlot.length < slots.length)){
        //             console.log('did run... 1');
                    
        //             setRandomSlot(current => [...current, ...[randomID]])
        //         }else{
        //             console.log('!randomSlot.length > slots.length', !(randomSlot.length > slots.length));
        //             console.log('did run... 2');
        //             var idx = slots.indexOf(randomID);
        //             // if(idx === -1)return;
        //             for (idx += 1; idx< slots.length; ++idx) {      
        //                 if(slots[idx] !== -1)setRandomSlot(current => [...current, ...[randomSlot[randomSlot.length - 1]]])           
        //             }
        //         }
        //     }else{
        //         console.log('!randomSlot.length > slots.length', !(randomSlot.length > slots.length));
        //         console.log("compare: e 3;",randomSlot);
        //         console.log("compare: e 3;",slots);
        //         // console.log(slots.filter(elm=>randomSlot.includes(elm)));
        //         // console.log(slots.filter(value => !randomSlot.includes(value)));
        //         // const lastData = slots.filter(value => !randomSlot.includes(value))
        //         // setRandomSlot(current => [...current, ...lastData])
        //         tostMessage('Plot is full')
        //     }
        // } else {
        //     tostMessage('Input should not be empty')
        // }
        if (inputCredentials) {
            const idx = newSlots.indexOf(randomID);
            if(!randomSlot.includes(randomID)){
                console.log('roandPlot 2', newSlots);
                console.log('did run... 1');                
                setRandomSlot(current => [...current, ...[randomID]])
                console.log('did run... 2');                
                if(idx > -1){
                    newSlots.splice(idx, 1);
                    console.log('roandPlot 3', newSlots);

                }
            }
        } else {
            tostMessage('Input should not be empty')
        }

        console.log('roandPlot', newSlots);
        // console.log('slot', slots);

        // toggleBottomSheet()
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={slots}
                style={styles.flexListStyle}
                numColumns={2}
                renderItem={({ item, index }) => {
                    // console.log(item, randomSlot[index]);
                    return (
                        <View style={[styles.flexItemChild, randomSlot.includes(item) ? { backgroundColor: 'green' } : null]}>
                            <Text>{item}</Text>
                            {
                                <Ionicons
                                    name="ios-car-sport-outline"
                                    size={24}
                                    color={'black'} />
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
                        <Text
                            style={{
                                textAlign: 'center',
                                paddingBottom: 50,
                                fontSize: 20,
                            }}>
                            New registration
                        </Text>
                        <View style={styles.inputComponentContainer}>

                            <TextInput
                                style={styles.inputHoursComponent}
                                // onChangeText={inputHoursChangeHandler}
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
            {/* <StatusBar style="auto" hidden /> */}
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