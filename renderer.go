package main

import (
	"log"
	"net/http"
	"text/template"
)

func render(w http.ResponseWriter, tmpl string, context any) {
	glob, err := template.ParseGlob("templates/*")
	if err != nil {
		log.Fatal(err)
	}

	err = glob.ExecuteTemplate(w, tmpl, context)
	if err != nil {
		log.Fatal(err)
	}
}
