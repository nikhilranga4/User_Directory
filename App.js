import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

// Import Screens
import UserListScreen from './src/screens/UserListScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';

// Create Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar 
          backgroundColor="#f4f4f4" 
          barStyle="dark-content" 
        />
        <Stack.Navigator 
          initialRouteName="UserList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4f4f4',
              elevation: 0, // Remove shadow on Android
              shadowOpacity: 0, // Remove shadow on iOS
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyle: {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <Stack.Screen 
            name="UserList" 
            component={UserListScreen} 
            options={{ 
              title: 'User Directory',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen 
            name="UserDetails" 
            component={UserDetailsScreen} 
            options={({ route }) => ({ 
              title: route.params?.user?.name || 'User Details',
              headerTitleAlign: 'center',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
