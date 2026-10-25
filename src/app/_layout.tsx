import { Stack } from 'expo-router';
import '../global.css'; // Sesuaikan lokasi global.css kamu

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Jangan daftarkan 'explore' di sini! */}
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}