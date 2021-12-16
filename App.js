import React from 'react'

import Splash from './Components/Screens/Splash'
import GroceryList from './Components/Screens/GroceryList'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>

        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />

        <Stack.Screen name="GroceryList" component={GroceryList} options={{
          headerLeft: null, headerStyle: { backgroundColor: '#fff' },
          title: "Welcome", headerTitleStyle: { fontSize: 25 }, headerTintColor: '#000'
        }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
