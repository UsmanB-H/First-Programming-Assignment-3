import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      <Stack.Screen name="logIn" options={{ title: 'Log In' }} />
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="home" options={{ title: 'My To-Do List' }} />
    </Stack>
  );
}
