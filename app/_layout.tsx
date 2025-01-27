import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='login' />
      <Stack.Screen name='action-modal'
      options={{
        presentation:'modal'
      }}
      />
    </Stack>
  );
};

export default RootLayout;
