package com.example.kavachapp

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.kavach.sdk.KavachClient
import com.kavach.sdk.KavachCallback

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize Kavach SDK
        val kavach = KavachClient.Builder(this)
            .setWorkspaceId("YOUR_WORKSPACE_ID")
            .setApiKey("YOUR_API_KEY")
            .build()

        kavach.initialize(object : KavachCallback {
            override fun onSuccess(fingerprint: String) {
                Log.i("KavachSDK", "✅ Kavach SDK initialized securely. Device fingerprint: $fingerprint")
                // Send this fingerprint to your backend along with login requests
            }

            override fun onFailure(error: Exception) {
                Log.e("KavachSDK", "❌ Kavach SDK failed to initialize: ${error.message}")
            }
        })
    }
}
