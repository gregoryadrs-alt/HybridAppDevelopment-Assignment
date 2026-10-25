import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthMode = 'signin' | 'signup';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [users, setUsers] = useState<Record<string, string>>({
    admin: 'password123',
    demo: '123456',
  });

  const router = useRouter();

  const resetFormState = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setSuccessMessage(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleAuth = () => {
    setError(null);
    setSuccessMessage(null);

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError('Please enter your username.');
      return;
    }

    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      if (users[trimmedUsername.toLowerCase()]) {
        setError('An account with this username already exists. Please sign in.');
        return;
      }

      setLoading(true);

      setTimeout(() => {
        setUsers((prev) => ({
          ...prev,
          [trimmedUsername.toLowerCase()]: password,
        }));
        setLoading(false);
        setSuccessMessage('Account created successfully! You can now sign in.');
        setMode('signin');
        setPassword('');
        setConfirmPassword('');
      }, 700);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const registeredPassword = users[trimmedUsername.toLowerCase()];

      if (!registeredPassword) {
        setError('Account not found. Please sign up first.');
        return;
      }

      if (registeredPassword !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }

      // Login success: Navigate directly to the homepage in (tabs)
      router.replace('/(tabs)/home' as any);
    }, 700);
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerClassName="grow justify-center items-center px-4 pt-4 pb-20"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View className="w-full max-w-[400px] gap-3">
              
              {/* Header */}
              <View className="gap-1 mb-2">
                <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-sm">
                  {mode === 'signin'
                    ? 'Enter your credentials to access your account'
                    : 'Sign up with a username and password to get started'}
                </Text>
              </View>

              {/* Mode Toggle Tabs */}
              <View className="flex-row rounded-xl bg-slate-200 dark:bg-slate-800 p-1 mb-2">
                <Pressable
                  onPress={() => resetFormState('signin')}
                  className={`flex-1 py-2 items-center justify-center rounded-lg ${
                    mode === 'signin' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''
                  }`}>
                  <Text className={`text-sm ${mode === 'signin' ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                    Sign In
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => resetFormState('signup')}
                  className={`flex-1 py-2 items-center justify-center rounded-lg ${
                    mode === 'signup' ? 'bg-white dark:bg-slate-700 shadow-sm' : ''
                  }`}>
                  <Text className={`text-sm ${mode === 'signup' ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>

              {/* Success Message */}
              {successMessage ? (
                <View className="bg-emerald-500/15 border border-emerald-500/40 rounded-xl py-2 px-3">
                  <Text className="text-emerald-600 dark:text-emerald-400 text-sm">{successMessage}</Text>
                </View>
              ) : null}

              {/* Error Message */}
              {error ? (
                <View className="bg-red-500/15 border border-red-500/40 rounded-xl py-2 px-3">
                  <Text className="text-red-600 dark:text-red-400 text-sm">{error}</Text>
                </View>
              ) : null}

              {/* Username Input */}
              <View className="gap-1">
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Username
                </Text>
                <TextInput
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. johndoe"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-base text-slate-900 dark:text-white"
                />
              </View>

              {/* Password Input */}
              <View className="gap-1">
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Password
                </Text>
                <View className="h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-3 pr-2 flex-row items-center">
                  <TextInput
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (error) setError(null);
                    }}
                    placeholder="At least 6 characters"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 h-full text-base text-slate-900 dark:text-white"
                  />
                  <Pressable
                    onPress={() => setShowPassword((prev) => !prev)}
                    hitSlop={8}
                    className="px-2 py-1 justify-center items-center">
                    <Text className="text-sm text-slate-500">
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Confirm Password */}
              {mode === 'signup' ? (
                <View className="gap-1">
                  <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Confirm Password
                  </Text>
                  <View className="h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-3 pr-2 flex-row items-center">
                    <TextInput
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (error) setError(null);
                      }}
                      placeholder="Repeat your password"
                      placeholderTextColor="#94a3b8"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="flex-1 h-full text-base text-slate-900 dark:text-white"
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword((prev) => !prev)}
                      hitSlop={8}
                      className="px-2 py-1 justify-center items-center">
                      <Text className="text-sm text-slate-500">
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              {/* Submit Button */}
              <Pressable
                onPress={handleAuth}
                disabled={loading}
                className={`h-12 rounded-xl justify-center items-center mt-2 bg-indigo-600 active:bg-indigo-700 ${
                  loading ? 'opacity-70' : ''
                }`}>
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-base font-semibold text-white">
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </Pressable>

              {/* Switch Mode Link */}
              <View className="flex-row justify-center items-center gap-1 mt-1">
                <Text className="text-sm text-slate-500">
                  {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                </Text>
                <Pressable
                  onPress={() => resetFormState(mode === 'signin' ? 'signup' : 'signin')}
                  hitSlop={6}>
                  <Text className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </Text>
                </Pressable>
              </View>

              {/* Demo Hint */}
              <View className="py-2 px-3 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 items-center mt-2">
                <Text className="text-xs text-slate-500 text-center">
                  💡 Demo account: <Text className="font-mono text-slate-700 dark:text-slate-300">demo</Text> /{' '}
                  <Text className="font-mono text-slate-700 dark:text-slate-300">123456</Text>
                </Text>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}