package auth

import (
	"net/http"
	"time"

	"github.com/garudaproject/casemgt/config"
	"github.com/garudaproject/casemgt/data"
	"github.com/garudaproject/casemgt/util"
	"github.com/gofiber/fiber/v2"
)

type Handler interface {
	Login(c *fiber.Ctx) error
	Register(c *fiber.Ctx) error
	Profile(c *fiber.Ctx) error
	Logout(c *fiber.Ctx) error
}

type handler struct {
	cfg     *config.Config
	service Service
}

func NewHandler(cfg *config.Config, service Service) Handler {
	return &handler{
		cfg:     cfg,
		service: service,
	}
}

func (h *handler) Login(c *fiber.Ctx) error {
	var req data.LoginReq
	if err := c.BodyParser(&req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: err.Error(),
			},
		)
	}
	if err := req.Validate(); err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: "Validation error.",
				Error:   util.ErrorValidation(err),
			},
		)
	}
	u, err := h.service.Login(c.Context(), &req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: err.Error(),
			},
		)
	}
	token, err := h.service.GenerateJWT(c.Context(), u, h.cfg.AppSecret, h.cfg.JwtExpires*24)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: err.Error(),
			},
		)
	}
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token.AccessToken,
		Path:     "/",
		MaxAge:   h.cfg.JwtExpires * 24,
		HTTPOnly: true,
	})
	return c.JSON(
		data.ApiRes{
			Status:  http.StatusOK,
			Message: "Login successful.",
			Data:    token,
		},
	)
}

func (h *handler) Register(c *fiber.Ctx) error {
	var req data.RegisterReq
	if err := c.BodyParser(&req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: err.Error(),
			},
		)
	}
	if err := req.Validate(); err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: "Validation error.",
				Error:   util.ErrorValidation(err),
			},
		)
	}
	u, err := h.service.Register(c.Context(), &req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: err.Error(),
			},
		)
	}
	token, err := h.service.GenerateJWT(c.Context(), u, h.cfg.AppSecret, h.cfg.JwtExpires*24)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: err.Error(),
			},
		)
	}
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token.AccessToken,
		Path:     "/",
		MaxAge:   h.cfg.JwtExpires * 24,
		HTTPOnly: true,
	})
	return c.Status(http.StatusCreated).JSON(
		data.ApiRes{
			Status:  http.StatusCreated,
			Message: "Register successful.",
			Data:    token,
		},
	)
}

func (h *handler) Profile(c *fiber.Ctx) error {
	u, err := h.service.Profile(c.Context(), c.Locals("uid").(uint))
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			data.ApiRes{
				Status:  http.StatusBadRequest,
				Message: err.Error(),
			},
		)
	}
	return c.Status(http.StatusOK).JSON(
		data.ApiRes{
			Status: http.StatusOK,
			Data:   u,
		},
	)
}

func (h *handler) Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Path:     "/",
		MaxAge:   0,
		Expires:  time.Now(),
		HTTPOnly: true,
	})
	return c.Status(http.StatusOK).JSON(
		data.ApiRes{
			Status:  http.StatusOK,
			Message: "Logout successful.",
		},
	)
}
