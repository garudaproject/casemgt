package middleware

import (
	"net/http"

	"github.com/garudaproject/casemgt/util"
	"github.com/gofiber/fiber/v2"
)

func JWTCookies(secret string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		token := c.Cookies("jwt")
		if token == "" {
			return c.SendStatus(http.StatusUnauthorized)
		}
		claims, err := util.ValidateJWT(secret, token)
		if err != nil {
			return c.SendStatus(http.StatusUnauthorized)
		}
		c.Locals("uid", claims.UserID)
		c.Locals("role", claims.Role)
		c.Context().SetUserValue("uid", claims.UserID)
		c.Context().SetUserValue("role", claims.Role)
		return c.Next()
	}
}
