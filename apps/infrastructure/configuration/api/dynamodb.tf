
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
