resource "aws_iam_role" "lambda_role" {
  name               = "nft-tracking-lambda-role-${var.deployment_environment}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_logging_policy" {
  name        = "nft-tracking-lambda-logging-policy-${var.deployment_environment}"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_logging_policy.arn
}

resource "aws_lambda_function" "update_user_data_lambda" {
  filename      = "${path.module}/bundles/infrastructure.zip"
  function_name = "nft-tracking-update-user-data-lambda-${var.deployment_environment}"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main.updateParsiqUserDataHandler"
  runtime       = "nodejs14.x"
  depends_on    = [aws_iam_role_policy_attachment.policy_attachment]
}

resource "aws_lambda_function" "add_address_to_db" {
  filename      = "${path.module}/bundles/infrastructure.zip"
  function_name = "nft-tracking-add-address-to-db-lambda-${var.deployment_environment}"
  role          = aws_iam_role.lambda_role.arn
  handler       = "main.addAddressToDbHandler"
  runtime       = "nodejs14.x"
  depends_on    = [aws_iam_role_policy_attachment.policy_attachment]
}
