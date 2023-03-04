param(
   [string]$awsRegion,
   [string]$awsAccountId,
   [string]$imageName,
   [string]$imageTag
)

# Login to AWS
Write-Host "Login to AWS"
$loginOutput = aws ecr get-login-password --region $awsRegion
Write-host $loginOutput
$password = $loginOutput
docker login --username AWS --password $password.password $awsAccountId.dkr.ecr.$awsRegion.amazonaws.com

# Create ECR repository
Write-Host "Create ECR repository"
aws ecr create-repository --repository-name $imageName --region $awsRegion

# Build Docker Container
Write-Host "Build Docker image: " ${imageName}:${imageTag}
docker build -t ${imageName}:${imageTag} .

# Tag Docker image
Write-Host "Tag Docker image: "  tag ${imageName}:${imageTag} "$($awsAccountId).dkr.ecr.$($awsRegion).amazonaws.com/${imageName}:$imageTag"
docker tag ${imageName}:$imageTag "$($awsAccountId).dkr.ecr.$($awsRegion).amazonaws.com/${imageName}:$imageTag"

# Push Docker image to ECR repository
Write-Host "Push Docker image to ECR repository"
docker push "$($awsAccountId).dkr.ecr.$($awsRegion).amazonaws.com/${imageName}:$imageTag"
