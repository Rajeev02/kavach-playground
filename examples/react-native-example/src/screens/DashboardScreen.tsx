import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDeviceFingerprint } from '../lib/kavach';
import { fetchAPI } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }: any) {
  const [trustScore, setTrustScore] = useState<number>(0);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      const storedEmail = await AsyncStorage.getItem('kavach_email');
      if (!storedEmail) {
        navigation.replace('Login');
        return;
      }
      setEmail(storedEmail);

      try {
        const fp = await getDeviceFingerprint();
        const result = await fetchAPI('/sdk/init', {
          method: 'POST',
          body: JSON.stringify({
            workspaceId: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e',
            apiKey: 'bf0dee3f-adcc-4e36-a306-ec3e5932b11e',
            platform: 'React Native iOS App',
            metadata: {
              userAgent: 'Kavach ReactNative/1.0',
              ipAddress: '192.168.1.100', // Mock IP
            }
          })
        });
        
        setDeviceFingerprint(result.fingerprint);
        setTrustScore(result.trustScore || 85);
      } catch (err: any) {
        Alert.alert('Verification Failed', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigation]);

  const handleTransfer = async () => {
    setTransferring(true);
    try {
      // Step-up Auth Simulation
      const fp = await getDeviceFingerprint();
      
      await fetchAPI('/example-app/transfer', {
        method: 'POST',
        body: JSON.stringify({ fingerprint: deviceFingerprint || fp.fingerprint })
      });

      Alert.alert('Success', 'Identity Verified via Biometrics. Transfer Complete!');
    } catch (err: any) {
      Alert.alert('Step-Up Auth Failed', 'Transfer Denied.');
    } finally {
      setTransferring(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('kavach_token');
    await AsyncStorage.removeItem('kavach_email');
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View className="flex-1 bg-slate-950 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-slate-400 mt-4">Securing connection...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-2xl font-bold text-white">Overview</Text>
            <Text className="text-slate-400">{email}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} className="bg-slate-800 px-4 py-2 rounded-lg">
            <Text className="text-red-400 font-medium">Logout</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg mb-6 items-center">
          <Text className="text-slate-400 font-medium mb-4 uppercase tracking-widest text-xs">Live Trust Score</Text>
          <View className="w-32 h-32 rounded-full border-8 border-green-500/20 items-center justify-center relative">
            <View className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent" style={{ transform: [{ rotate: '45deg' }] }}></View>
            <Text className="text-5xl font-bold text-white">{trustScore}</Text>
          </View>
          <Text className="text-green-400 font-medium mt-4">Zero Trust Enabled</Text>
        </View>

        <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg mb-6">
          <Text className="text-white font-bold text-lg mb-4">Secure Financial Data</Text>
          <View className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <Text className="text-slate-400 mb-1">Account Balance</Text>
            <Text className="text-white text-3xl font-mono font-bold">$1,450,299.00</Text>
          </View>
          
          <TouchableOpacity 
            onPress={handleTransfer}
            disabled={transferring}
            className={`w-full bg-blue-600 py-4 rounded-xl items-center mt-6 ${transferring ? 'opacity-50' : ''}`}
          >
            {transferring ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">Initiate Wire Transfer</Text>
            )}
          </TouchableOpacity>
          <Text className="text-slate-500 text-center text-xs mt-4">Requires Step-Up Biometric Authentication</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
