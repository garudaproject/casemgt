package auth

import (
	"context"
	"errors"

	"github.com/garudaproject/casemgt/data"
	"github.com/garudaproject/casemgt/types"
	"github.com/garudaproject/casemgt/util"
)

var (
	ErrEmailNotRegistered           = errors.New("Email not registered.")
	ErrEmailAlreadyRegistered       = errors.New("Email already registered.")
	ErrPasswordWrong                = errors.New("Password wrong.")
	ErrPasswordConfirmationNotMatch = errors.New("Password confirmation not match.")
	ErrUserNotFound                 = errors.New("User not found.")
)

type Service interface {
	Login(ctx context.Context, req *data.LoginReq) (*data.UserRes, error)
	Register(ctx context.Context, req *data.RegisterReq) (*data.UserRes, error)
	Profile(ctx context.Context, userId uint) (*data.UserRes, error)
	GenerateJWT(ctx context.Context, user *data.UserRes, secret string, expires int) (*data.JwtRes, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

func (s *service) Login(ctx context.Context, req *data.LoginReq) (*data.UserRes, error) {
	u, err := s.repo.GetUserByEmail(ctx, req.Email)
	if err != nil {
		return nil, ErrEmailNotRegistered
	}
	if err := util.ComparePassword(req.Password, u.Password); err != nil {
		return nil, ErrPasswordWrong
	}
	return data.ToUserRes(u), nil
}

func (s *service) Register(ctx context.Context, req *data.RegisterReq) (*data.UserRes, error) {
	_, err := s.repo.GetUserByEmail(ctx, req.Email)
	if err == nil {
		return nil, ErrEmailAlreadyRegistered
	}
	if req.Password != req.ConfirmPassword {
		return nil, ErrPasswordConfirmationNotMatch
	}
	u := &types.User{
		Name:      req.Name,
		Email:     req.Email,
		Password:  util.HashPassword(req.Password),
		AvatarURL: "avatar.png",
		Role:      types.CLIENT,
	}
	if err := s.repo.CreateUser(ctx, u); err != nil {
		return nil, err
	}
	return data.ToUserRes(u), nil
}

func (s *service) Profile(ctx context.Context, userId uint) (*data.UserRes, error) {
	u, err := s.repo.GetUserByID(ctx, userId)
	if err != nil {
		return nil, ErrUserNotFound
	}
	return data.ToUserRes(u), nil
}

func (s *service) GenerateJWT(ctx context.Context, user *data.UserRes, secret string, expires int) (*data.JwtRes, error) {
	token, exp, err := util.GenerateJWT(secret, &types.JwtClaims{
		UserID:  user.ID,
		Role:    user.Role,
		Issues:  "jwt",
		Expires: expires,
	})
	if err != nil {
		return nil, err
	}
	return &data.JwtRes{
		AccessToken: token,
		Type:        "bearer",
		Expires:     exp,
	}, nil
}
