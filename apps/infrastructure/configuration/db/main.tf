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

resource "aws_dynamodb_table" "api_dynamodb_table" {
  name         = "nft-tracking-table-${var.deployment_environment}"
  hash_key     = "address"
  range_key    = "user_id"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "address"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }
}
