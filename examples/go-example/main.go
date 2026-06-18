package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rajeev02/kavach-go"
)

func main() {
	// Initialize the Kavach SDK Client
	client, err := kavach.NewClient(kavach.Config{
		WorkspaceID: "YOUR_WORKSPACE_ID",
		APIKey:      "YOUR_API_KEY",
	})
	if err != nil {
		log.Fatalf("Failed to initialize Kavach SDK: %v", err)
	}

	// Example handler protected by Kavach
	http.HandleFunc("/api/secure-data", client.Middleware(func(w http.ResponseWriter, r *http.Request) {
		// If the middleware passes, the user's device/session is trusted
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"status": "success", "message": "You accessed secure data!"}`)
	}))

	fmt.Println("Server running on :8080. Access /api/secure-data with a valid Kavach token.")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
