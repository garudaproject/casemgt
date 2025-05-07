package data

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type LoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (r LoginReq) Validate() error {
	return validation.ValidateStruct(&r,
		validation.Field(&r.Email, validation.Required, is.Email, validation.Length(1, 128)),
		validation.Field(&r.Password, validation.Required, validation.Length(1, 128)),
	)
}

type RegisterReq struct {
	Name            string `json:"name"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
}

func (r RegisterReq) Validate() error {
	return validation.ValidateStruct(&r,
		validation.Field(&r.Name, validation.Required, validation.Length(1, 255)),
		validation.Field(&r.Email, validation.Required, is.Email, validation.Length(1, 128)),
		validation.Field(&r.Password, validation.Required, validation.Length(8, 128)),
		validation.Field(&r.ConfirmPassword, validation.Required, validation.Length(8, 128)),
	)
}

type UserCreateReq struct {
}

type UserUpdateReq struct {
	ID uint
}
