CREATE TABLE `credits_leads` (
	`id` varchar(128) NOT NULL,
	`customer_name` varchar(150) NOT NULL,
	`amount` varchar(50) NOT NULL,
	`status` varchar(30) NOT NULL,
	`created_by` varchar(128) NOT NULL,
	`approved_by` varchar(128),
	`created_at` date NOT NULL,
	`approved_at` date,
	CONSTRAINT `credits_leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(128) NOT NULL,
	`username` varchar(50) NOT NULL,
	`name` varchar(150) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` enum('approver','user','admin') NOT NULL,
	`created_at` date NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_user_username` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE INDEX `idx_credits_leads_created_by` ON `credits_leads` (`created_by`);--> statement-breakpoint
CREATE INDEX `idx_credits_leads_approved_by` ON `credits_leads` (`approved_by`);--> statement-breakpoint
CREATE INDEX `idx_user_role` ON `user` (`role`);