package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func main() {
	address := fmt.Sprintf(":%s", getEnv("port", "8080"))

	server, err := NewServer()
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Starting server at port %s", address)

	if err := http.ListenAndServe(
		address,
		server.GetHTTPHandler(),
	); err != nil {
		log.Fatal(err)
	}
}
