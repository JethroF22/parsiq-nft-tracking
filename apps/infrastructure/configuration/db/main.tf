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
  range_key    = "recordId"
  hash_key     = "userId"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "address"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "recordId"
    type = "S"
  }

  attribute {
    name = "recordType"
    type = "S"
  }

  local_secondary_index {
    name            = "SearchByRecordType"
    range_key       = "recordType"
    projection_type = "ALL"
  }

  global_secondary_index {
    name               = "SearchByAddress"
    hash_key           = "address"
    projection_type    = "INCLUDE"
    non_key_attributes = ["userId"]
  }
}
