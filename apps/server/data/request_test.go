package data

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLoginReq(t *testing.T) {
	type testcase struct {
		data   LoginReq
		result string
	}
	testcases := []testcase{
		{
			data: LoginReq{
				Email:    "",
				Password: "",
			},
			result: "email: cannot be blank; password: cannot be blank.",
		},
		{
			data: LoginReq{
				Email:    "test@mail.com",
				Password: "",
			},
			result: "password: cannot be blank.",
		},
		{
			data: LoginReq{
				Email:    "email@mail.com",
				Password: "password",
			},
			result: "",
		},
	}
	for _, tc := range testcases {
		err := tc.data.Validate()
		if err != nil && assert.Error(t, err) {
			assert.EqualError(t, err, tc.result)
		}
	}
}

func TestRegisterReq(t *testing.T) {
	type testcase struct {
		data   RegisterReq
		result string
	}
	testcases := []testcase{
		{
			data: RegisterReq{
				Name:            "",
				Email:           "",
				Password:        "",
				ConfirmPassword: "",
			},
			result: "confirm_password: cannot be blank; email: cannot be blank; name: cannot be blank; password: cannot be blank.",
		},
		{
			data: RegisterReq{
				Name:            "test",
				Email:           "test@mail.com",
				Password:        "password",
				ConfirmPassword: "password",
			},
			result: "",
		},
	}
	for _, tc := range testcases {
		err := tc.data.Validate()
		if err != nil && assert.Error(t, err) {
			assert.EqualError(t, err, tc.result)
		}
	}
}
