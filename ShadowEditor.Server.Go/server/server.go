package server

import (
	"log"
	"net/http"

	"github.com/tengge1/shadoweditor/context"

	"github.com/tengge1/shadoweditor/server/middleware"

	_ "github.com/tengge1/shadoweditor/server/animation" // animation api
	_ "github.com/tengge1/shadoweditor/server/export"    // export api
	_ "github.com/tengge1/shadoweditor/server/system"    // system api
	_ "github.com/tengge1/shadoweditor/server/texture"   // texture api
	_ "github.com/tengge1/shadoweditor/server/tools"     // tools api
	"github.com/urfave/negroni"
)

// Start start the server
func Start() {
	log.Printf("starting shadoweditor server on port %v", context.Config.Server.Port)

	handler := negroni.Classic()
	handler.Use(negroni.HandlerFunc(middleware.CrossOriginHandler))
	handler.Use(negroni.HandlerFunc(middleware.GZipHandler))
	handler.Use(negroni.HandlerFunc(middleware.StaticHandler))
	handler.UseHandler(context.Mux)

	err := http.ListenAndServe(context.Config.Server.Port, handler)
	if err != nil {
		switch err {
		case http.ErrServerClosed:
			log.Panicln("http server closed")
		default:
			log.Fatal(err)
		}
	}
}
