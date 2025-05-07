package handler

import (
	"net/http"

	"github.com/garudaproject/casemgt/server"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	r.RequestURI = r.URL.String()
	handler().ServeHTTP(w, r)
}

func handler() http.Handler {
	app := server.New()
	return adaptor.FiberApp(app.App)
}
