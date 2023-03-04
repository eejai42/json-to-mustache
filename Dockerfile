# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the app source code to the container
COPY . .

# Expose port 3000 in the container
EXPOSE 3000

# Specify the command to run when the container starts
CMD [ "npm", "start" ]