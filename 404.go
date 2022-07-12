package main

import (
	"net/http"
)

type Context struct {
	Title      string
	BaseURL    string
	Message    string
	BtnMessage string
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	render(w, "404.tmpl", Context{
		Title:      "404",
		BaseURL:    "localhost:8080",
		Message:    "How you got here is a mystery. Let's get you back.",
		BtnMessage: "Go Back",
	})
}
