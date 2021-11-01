variable "deployment_environment" {
  type        = string
  description = "The deployment environment in which to provision the resources"

  validation {
    condition = anytrue([
      var.deployment_environment == "development",
      var.deployment_environment == "staging",
      var.deployment_environment == "production"
    ])
    error_message = "Please provide a valid value for the variable \"deployment_environment\".\n\nAccepted values are: development, staging, production."
  }
}
