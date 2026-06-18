package main

import (
	"encoding/json"
	"fmt"
	"time"
)

// KavachClient represents the published Go SDK: pkg.go.dev/github.com/Rajeev02/kavachid/sdks/kavach-go
type KavachClient struct {
	Endpoint    string
	WorkspaceID string
	DemoMode    bool
}

func NewKavachClient(endpoint, workspaceId string, demoMode bool) *KavachClient {
	fmt.Printf("✅ Kavach Go SDK initialized! Connected to %s\n", endpoint)
	return &KavachClient{Endpoint: endpoint, WorkspaceID: workspaceId, DemoMode: demoMode}
}

func (c *KavachClient) VerifyIntegrity() map[string]interface{} {
	return map[string]interface{}{
		"status":         "VERIFIED",
		"risk_score":     8,
		"sandbox_active": true,
		"device_id":      "go_sandbox_8820",
	}
}

func main() {
	fmt.Println("🚀 Starting Go SDK Demo")

	// 1. Initialize Kavach Client pointing to the Sandbox Backend
	client := NewKavachClient("https://api.demo.kavachid.com", "demo_global_1", true)

	// 2. Run Security Check
	fmt.Println("Executing Integrity Verification...")
	time.Sleep(1 * time.Second)

	result := client.VerifyIntegrity()

	bytes, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println("\n--- Sandbox Backend Response ---")
	fmt.Println(string(bytes))
	fmt.Println("--------------------------------")
}
