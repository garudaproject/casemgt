package database

import (
	"log"

	"github.com/garudaproject/casemgt/config"
	"github.com/garudaproject/casemgt/types"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Connect(cfg *config.Config) *gorm.DB {
	LoggerMode := logger.Default
	if cfg.IsDev() {
		LoggerMode = logger.Default.LogMode(logger.Info)
	}
	db, err := gorm.Open(postgres.Open(cfg.DatabaseURI), &gorm.Config{
		Logger: LoggerMode,
	})
	if err != nil {
		panic(err)
	}
	if err := db.AutoMigrate(&types.User{}); err != nil {
		panic(err)
	}
	log.Println("database connected")
	return db
}
