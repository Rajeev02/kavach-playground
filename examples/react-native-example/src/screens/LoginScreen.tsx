import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAPI } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('admin@demo.com');
  const [otp, setOtp] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async () => {
    setLoading(true);
    try {
      await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setStep('otp');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const data = await fetchAPI('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code: otp }),
      });
      
      await AsyncStorage.setItem('kavach_token', data.token);
      await AsyncStorage.setItem('kavach_email', email);
      
      navigation.replace('Dashboard');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 justify-center px-8">
        <View className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
          <Text className="text-3xl font-bold text-white mb-2 text-center">Sign In</Text>
          <Text className="text-slate-400 text-center mb-8">Secure access via Kavach</Text>

          {step === 'email' ? (
            <View className="space-y-4">
              <View>
                <Text className="text-slate-300 font-medium mb-2">Email Address</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-700 focus:border-blue-500"
                  placeholder="name@company.com"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                onPress={handleRequestOTP}
                disabled={loading}
                className={`w-full bg-blue-600 py-3 rounded-xl items-center mt-6 ${loading ? 'opacity-50' : ''}`}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Continue</Text>}
              </TouchableOpacity>
              <Text className="text-slate-500 text-center text-xs mt-4">Demo: admin@demo.com</Text>
            </View>
          ) : (
            <View className="space-y-4">
              <View>
                <Text className="text-slate-300 font-medium mb-2">Verification Code</Text>
                <TextInput
                  value={otp}
                  onChangeText={setOtp}
                  className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-700 focus:border-blue-500 text-center text-xl tracking-widest"
                  placeholder="000000"
                  placeholderTextColor="#64748b"
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              <TouchableOpacity
                onPress={handleVerifyOTP}
                disabled={loading}
                className={`w-full bg-blue-600 py-3 rounded-xl items-center mt-6 ${loading ? 'opacity-50' : ''}`}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Verify & Login</Text>}
              </TouchableOpacity>
              <Text className="text-slate-500 text-center text-xs mt-4">Demo OTP is always 123456</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
