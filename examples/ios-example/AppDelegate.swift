import UIKit
import KavachSDK

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        
        // Initialize Kavach SDK
        let kavach = KavachClient(
            workspaceId: "YOUR_WORKSPACE_ID",
            apiKey: "YOUR_API_KEY"
        )
        
        kavach.initialize { result in
            switch result {
            case .success(let fingerprint):
                print("✅ Kavach SDK initialized securely. Device fingerprint: \(fingerprint)")
                // Send this fingerprint to your backend along with login requests
            case .failure(let error):
                print("❌ Kavach SDK failed to initialize: \(error)")
            }
        }
        
        return true
    }

    // ... standard AppDelegate methods
}
