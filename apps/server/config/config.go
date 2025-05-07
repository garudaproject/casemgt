package config

import (
	"os"
	"strconv"

	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	AppURL      string
	AppEnv      string
	AppPort     string
	AppSecret   string
	DatabaseURI string
	JwtExpires  int
}

func New() *Config {
	return &Config{
		AppURL:      EnvString("APP_URL", "http://localhost:9001"),
		AppEnv:      EnvString("APP_ENV", "development"),
		AppPort:     EnvString("APP_PORT", ":9000"),
		AppSecret:   EnvString("APP_SECRET", "supersecret"),
		DatabaseURI: EnvString("DATABASE_URI", ""),
		JwtExpires:  EnvInt("JWT_EXPIRES", 3600),
	}
}

func (c Config) IsDev() bool {
	return c.AppEnv == "development"
}

func EnvString(key string, fallback string) string {
	v, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}
	return v
}

func EnvInt(key string, fallback int) int {
	v, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}
	vi, err := strconv.Atoi(v)
	if err != nil {
		return fallback
	}
	return vi
}
