package util

import (
	"fmt"
	"time"

	"github.com/garudaproject/casemgt/types"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(secret string, claims *types.JwtClaims) (string, int64, error) {
	claims.RegisteredClaims = jwt.RegisteredClaims{
		Issuer:    claims.Issues,
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(claims.Expires) * time.Second)),
	}
	jwtClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := jwtClaims.SignedString([]byte(secret))
	if err != nil {
		return "", 0, err
	}
	return token, claims.ExpiresAt.Unix(), nil
}

func ValidateJWT(secret string, token string) (*types.JwtClaims, error) {
	jwtParsed, err := jwt.ParseWithClaims(token, &types.JwtClaims{}, func(t *jwt.Token) (any, error) {
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := jwtParsed.Claims.(*types.JwtClaims)
	if !ok {
		return nil, fmt.Errorf("Failed to parsed jwt token.")
	}
	return claims, nil
}
