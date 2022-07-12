package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

type Server struct{}

func NewServer() (*Server, error) {
	return &Server{}, nil
}

func (s *Server) GetHTTPHandler() http.Handler {
	r := mux.NewRouter()

	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("./static/")))).Methods("GET")

	r.NotFoundHandler = r.NewRoute().HandlerFunc(NotFoundHandler).GetHandler()

	return r
}
