# Run using: pip install rajeev02-kavach-sdk
import time
import json

# Mocking the published Python SDK for demo execution purposes
class KavachClient:
    def __init__(self, endpoint, workspace_id, demo_mode=False):
        self.endpoint = endpoint
        self.workspace_id = workspace_id
        print(f"✅ Kavach Python SDK initialized! Connected to {self.endpoint}")

    def verify_integrity(self):
        return {
            "status": "VERIFIED",
            "risk_score": 10,
            "sandbox_active": True,
            "device_id": "py_sandbox_9921"
        }

if __name__ == "__main__":
    print("🚀 Starting Python SDK Demo")
    
    # 1. Initialize Kavach Client pointing to the Sandbox Backend
    client = KavachClient(
        endpoint="https://api.demo.kavachid.com",
        workspace_id="demo_global_1",
        demo_mode=True
    )
    
    # 2. Run Security Check
    print("Executing Integrity Verification...")
    time.sleep(1)
    
    result = client.verify_integrity()
    
    print("\n--- Sandbox Backend Response ---")
    print(json.dumps(result, indent=2))
    print("--------------------------------")
