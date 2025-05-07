package types

import "context"

type Role string

const (
	ADMIN        Role = "ADMIN"
	MANAGER      Role = "MANAGER"
	RECEPTIONIST Role = "RECEPTIONIST"
	EXAMINER     Role = "EXAMINER"
	CLIENT       Role = "CLIENT"
)

func IsAdmin(ctx context.Context) bool {
	v, ok := ctx.Value("role").(Role)
	if !ok {
		return false
	}
	return v == ADMIN
}

func IsManager(ctx context.Context) bool {
	v, ok := ctx.Value("role").(Role)
	if !ok {
		return false
	}
	return v == MANAGER
}

func IsExaminer(ctx context.Context) bool {
	v, ok := ctx.Value("role").(Role)
	if !ok {
		return false
	}
	return v == EXAMINER
}

func IsReceptionist(ctx context.Context) bool {
	v, ok := ctx.Value("role").(Role)
	if !ok {
		return false
	}
	return v == RECEPTIONIST
}

func IsClient(ctx context.Context) bool {
	v, ok := ctx.Value("role").(Role)
	if !ok {
		return false
	}
	return v == CLIENT
}
