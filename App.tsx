import { AppContextProvider } from './Context/AppContext'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ParkingSlots from './screens/ParkingSlopts';
import PayScreen from './screens/PayScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Parking Slot"
            component={ParkingSlots}
            />
          <Stack.Screen
            name="PayScreen"
            component={PayScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  )
}