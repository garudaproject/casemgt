package server

import (
	"os"
	"os/signal"

	"github.com/garudaproject/casemgt/config"
	"github.com/garudaproject/casemgt/database"
	"github.com/garudaproject/casemgt/middleware"
	"github.com/garudaproject/casemgt/pkg/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

type Server struct {
	*fiber.App
	cfg    *config.Config
	quitCh chan os.Signal
}

func New() *Server {
	cfg := config.New()
	db := database.Connect(cfg)

	app := fiber.New()
	app.Use(logger.New())
	// s.Use(recover.New())

	authRepo := auth.NewRepository(db)
	authSvc := auth.NewService(authRepo)
	authHandler := auth.NewHandler(cfg, authSvc)

	api := app.Group("/api")

	authGroup := api.Group("/auth")
	authGroup.Post("/login", authHandler.Login)
	authGroup.Post("/register", authHandler.Register)
	authGroup.Get("/profile", middleware.JWTCookies(cfg.AppSecret), authHandler.Profile)
	authGroup.Delete("/logout", middleware.JWTCookies(cfg.AppSecret), authHandler.Logout)

	return &Server{
		App:    app,
		cfg:    cfg,
		quitCh: make(chan os.Signal, 1),
	}
}

func (s *Server) Run() error {
	go func() {
		if err := s.Listen(s.cfg.AppPort); err != nil {
			panic(err)
		}
	}()

	signal.Notify(s.quitCh, os.Interrupt)

	<-s.quitCh

	return s.Shutdown()
}
