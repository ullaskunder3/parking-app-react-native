import { AppContext, AppContextProvider } from './Context/AppContext'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ParkingSlot from './screens/ParkingSlot';
import ParkingSlots from './screens/ParkingSlopts';

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
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  )
}