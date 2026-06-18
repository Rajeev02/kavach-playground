import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import Kavach from '@kavach/react-native';

const kavach = new Kavach({
  workspaceId: 'YOUR_WORKSPACE_ID',
  apiKey: 'YOUR_API_KEY'
});

export default function App() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    async function setupKavach() {
      // Initialize the Kavach SDK
      await kavach.init();
      
      // Get the secure device fingerprint
      const fp = await kavach.getFingerprint();
      setFingerprint(fp);
    }
    
    setupKavach();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Kavach Security Status</Text>
        <Text style={styles.status}>
          {fingerprint ? '✅ Secured' : 'Initializing...'}
        </Text>
        {fingerprint && (
          <Text style={styles.fingerprint}>Device ID: {fingerprint}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#1e293b', padding: 24, borderRadius: 12 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  status: { color: '#4ade80', fontSize: 16, marginBottom: 8 },
  fingerprint: { color: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }
});
