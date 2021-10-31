terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "me"
  region  = "eu-west-1"
}

resource "aws_cognito_user_pool" "nft-tracking-user-pool" {
  name = "nft-tracking-user-pool-${var.deployment_environment}"

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  verification_message_template {
    email_message        = "Welcome to the NFT Tracking Platform.\n\nYour code is {####}."
    email_subject        = "Your NFT Tracking Platform Verification Code"
    default_email_option = "CONFIRM_WITH_CODE"
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]

  tags = {
    name                   = "nft-tracking-user-pool-${var.deployment_environment}"
    project                = "nft-tracking"
    deployment_environment = "nft-tracking-${var.deployment_environment}"
  }
}

resource "aws_cognito_user_pool_client" "nft-tracking-user-pool-client" {
  name                          = "nft-tracking-user-pool-client-${var.deployment_environment}"
  user_pool_id                  = aws_cognito_user_pool.nft-tracking-user-pool.id
  generate_secret               = false
  prevent_user_existence_errors = "ENABLED"
}

resource "aws_cognito_user_pool_domain" "nft-tracking-user-pool-domain" {
  domain       = "nft-tracking-user-pool-domain-${var.deployment_environment}"
  user_pool_id = aws_cognito_user_pool.nft-tracking-user-pool.id
}
