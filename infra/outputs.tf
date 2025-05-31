output "lambda_function_name" {
  description = "Nombre de la función Lambda"
  value       = aws_lambda_function.typescript_lambda.function_name
}

output "api_gateway_url" {
  description = "URL de la API Gateway"
  value       = "${aws_api_gateway_deployment.deployment.invoke_url}${aws_api_gateway_resource.resource.path}"
}

output "api_gateway_url_franchise" {
  description = "URL de la API Gateway Franchise"
  value       = "${aws_api_gateway_deployment.franchise_project_deployment.invoke_url}${aws_api_gateway_resource.resource.path}"
}

output "rds_endpoint" {
  description = "El endpoint de la instancia RDS MySQL."
  value       = aws_db_instance.main.endpoint
}