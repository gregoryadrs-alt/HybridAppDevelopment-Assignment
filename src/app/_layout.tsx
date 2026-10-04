import { Stack } from 'expo-router';
import '../global.css'; // Sesuaikan path global.css kamu

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
    </Stack>
  );
}