import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Sembunyikan header bawaan
        animation: 'slide_from_right', // Efek animasi saat pindah halaman
      }}
    />
  );
}