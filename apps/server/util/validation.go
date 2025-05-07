package util

import (
	"encoding/json"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

func ErrorValidation(err error) map[string]string {
	if err == nil {
		return nil
	}
	var errors map[string]string
	if errs, ok := err.(validation.Errors); ok {
		if errJson, err := errs.MarshalJSON(); err == nil {
			if err := json.Unmarshal(errJson, &errors); err != nil {
				panic(err)
			}
		}
		return errors
	}
	errors["message"] = err.Error()
	return errors
}
