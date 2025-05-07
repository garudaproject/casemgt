package types

type Status string

const (
	OnReview  Status = "onreview"
	Processed Status = "processed"
	Completed Status = "completed"
	Canceled  Status = "canceled"
	Archived  Status = "archived"
	Approved  Status = "approved"
	Rejected  Status = "rejected"
)
