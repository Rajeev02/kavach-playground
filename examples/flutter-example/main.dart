import 'package:flutter/material.dart';
import 'package:kavach_flutter/kavach_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Kavach SDK
  final kavach = KavachClient(
    workspaceId: 'YOUR_WORKSPACE_ID',
    apiKey: 'YOUR_API_KEY',
  );

  try {
    final fingerprint = await kavach.initialize();
    print('✅ Kavach SDK initialized securely. Device fingerprint: $fingerprint');
  } catch (e) {
    print('❌ Kavach SDK failed to initialize: $e');
  }

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Kavach Security')),
        body: const Center(
          child: Text('Device is secured by Kavach SDK'),
        ),
      ),
    );
  }
}
