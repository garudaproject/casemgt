package data

import (
	"time"

	"github.com/garudaproject/casemgt/types"
)

type Meta struct {
	Page   int   `json:"page"`
	Limit  int   `json:"limit"`
	Offset int   `json:"offset"`
	Total  int64 `json:"total"`
}

type JwtRes struct {
	AccessToken string `json:"access_token"`
	Type        string `json:"type"`
	Expires     int64  `json:"expires"`
}

type ApiRes struct {
	Status  int    `json:"status"`
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
	Error   any    `json:"error,omitempty"`
}

type UserRes struct {
	ID              uint       `json:"id"`
	Name            string     `json:"name"`
	Email           string     `json:"email"`
	Password        string     `json:"-"`
	Phone           string     `json:"phone"`
	AvatarURL       string     `json:"avatar_url"`
	Role            types.Role `json:"role"`
	EmailVerifiedAt any        `json:"email_verified_at"`
	CreatedAt       time.Time  `json:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at"`
}

func ToUserRes(s *types.User) *UserRes {
	res := &UserRes{
		ID:        s.ID,
		Name:      s.Name,
		Email:     s.Email,
		Password:  s.Password,
		Phone:     s.Phone,
		AvatarURL: s.AvatarURL,
		Role:      s.Role,
		CreatedAt: s.CreatedAt,
		UpdatedAt: s.UpdatedAt,
	}
	if s.EmailVerifiedAt.Valid {
		res.EmailVerifiedAt = s.EmailVerifiedAt.Time
	}
	return res
}
