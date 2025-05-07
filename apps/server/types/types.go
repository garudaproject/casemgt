package types

import (
	"database/sql"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	ID              uint         `gorm:"primaryKey"`
	Name            string       `gorm:"type:varchar(255);null"`
	Email           string       `gorm:"type:varchar(255);unique"`
	Password        string       `gorm:"type:varchar(255)"`
	Phone           string       `gorm:"type:varchar(20);null"`
	AvatarURL       string       `gorm:"type:varchar(255);null"`
	Role            Role         `gorm:"type:varchar(60)"`
	EmailVerifiedAt sql.NullTime `gorm:"timestamp;null"`
	CreatedAt       time.Time    `gorm:"autoCreateTime"`
	UpdatedAt       time.Time    `gorm:"autoUpdateTime"`
}
type JwtClaims struct {
	UserID  uint `json:"uid"`
	Role    Role `json:"role"`
	Issues  string
	Expires int
	jwt.RegisteredClaims
}

type ApiError struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Err     any    `json:"error"`
}

func (e ApiError) Error() string {
	return e.Message
}
