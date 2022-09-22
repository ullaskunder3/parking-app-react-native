import {View, StyleSheet, Animated, useWindowDimensions} from 'react-native'

export default function Paginator({slot, scrollX}) {
    const { width } = useWindowDimensions();
  return (
    <View style={styles.paginatorContainer}>
        {slot.map((_, i)=>{
            const inputRange = [(i-1)*width, i*width, (i+1)*width];
            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [5, 20, 5],
                extrapolate: 'clamp'
            })
            return <Animated.View style={[styles.paginatorDots, {width: dotWidth}]} key={i.toString()} />
        })}
    </View>
  )
}

const styles = StyleSheet.create({
    paginatorContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paginatorDots:{
        width: 10,
        height: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#000'
    }
  });