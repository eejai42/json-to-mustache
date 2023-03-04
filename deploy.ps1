param(
   [string]$awsRegion = "us-east-2",
   [string]$awsAccountId = "889457909864",
   [string]$imageName = "chatgpt-proxy-server",
   [string]$imageTag = "latest"
)

.\deploy-internals.ps1 -awsRegion $awsRegion -awsAccountId $awsAccountId -imageName $imageName -imageTag $imageTag
