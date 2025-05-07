package auth

import (
	"context"

	"github.com/garudaproject/casemgt/types"
	"gorm.io/gorm"
)

type Repository interface {
	CreateUser(ctx context.Context, user *types.User) error
	GetUserByID(ctx context.Context, id uint) (*types.User, error)
	GetUserByEmail(ctx context.Context, email string) (*types.User, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{
		db: db,
	}
}

func (r *repository) CreateUser(ctx context.Context, user *types.User) error {
	if err := r.db.Create(&user).Scan(&user); err.Error != nil {
		return err.Error
	}
	return nil
}

func (r *repository) GetUserByEmail(ctx context.Context, email string) (*types.User, error) {
	var user types.User
	if err := r.db.Where("email = ?", email).First(&user); err.Error != nil {
		return nil, err.Error
	}
	return &user, nil
}

func (r *repository) GetUserByID(ctx context.Context, id uint) (*types.User, error) {
	var user types.User
	if err := r.db.Where("id = ?", id).First(&user); err.Error != nil {
		return nil, err.Error
	}
	return &user, nil
}
