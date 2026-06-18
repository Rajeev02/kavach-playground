from kavach import KavachClient

def main():
    print("Initializing Kavach Python SDK...")
    
    # Initialize the client
    client = KavachClient(
        workspace_id="YOUR_WORKSPACE_ID",
        api_key="YOUR_API_KEY"
    )
    
    client.init()
    
    # Example: Verifying a user session or token
    # In a real backend (e.g. FastAPI), you would extract the token from the request headers
    mock_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token..."
    
    try:
        session_data = client.verify_token(mock_token)
        print(f"✅ Session verified! Trust score: {session_data.get('trust_score')}")
    except Exception as e:
        print(f"❌ Security violation detected: {e}")

if __name__ == "__main__":
    main()
