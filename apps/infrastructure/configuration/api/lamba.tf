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

# data "archive_file" "default" {
#   type        = "zip"
#   source_dir  = "${path.module}/files/"
#   output_path = "${path.module}/myzip/python.zip"
# }

# resource "aws_lambda_function" "lambdafunc" {
#   filename      = "${path.module}/myzip/python.zip"
#   function_name = "My_Lambda_function"
#   role          = aws_iam_role.lambda_role.arn
#   handler       = "index.lambda_handler"
#   runtime       = "python3.8"
#   depends_on    = [aws_iam_role_policy_attachment.policy_attach]
# }
