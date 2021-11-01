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

resource "aws_iam_policy" "lambda_execution_policy" {
  name = "nft-tracking-step-function-lambda-execution-policy-${var.deployment_environment}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["lambda:InvokeFunction"]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role" "step_function_iam_role" {
  name = "nft-tracking-step-function-iam-role-${var.deployment_environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "states.eu-west-1.amazonaws.com"
        }
      },
    ]
  })

  managed_policy_arns = [aws_iam_policy.lambda_execution_policy.arn]

  tags = {
    project = "nft-tracking"
  }
}

resource "aws_sfn_state_machine" "nft_tracking_state_machine" {
  name     = "nft-tracking-state-machine-${var.deployment_environment}"
  role_arn = aws_iam_role.step_function_iam_role.arn

  definition = <<EOF
  {
    "StartAt": "AddNewAddress",
    "States": {
        "AddNewAddress": {
            "Type": "Parallel",
            "End": true,
            "Branches": [
                {
                    "StartAt": "SendUserDataRequest",
                    "States": {
                        "SendUserDataRequest": {
                            "Type": "Task",
                            "Resource": "${aws_lambda_function.update_user_data_lambda.arn}",
                            "End": true
                        }
                    }
                },
                {
                    "StartAt": "AddAddressToDB",
                    "States": {
                        "AddAddressToDB": {
                            "Type": "Task",
                            "Resource": "${aws_lambda_function.add_address_to_db.arn}",
                            "End": true
                        }
                    }
                }
            ]
        }
    }
}
  EOF
}
