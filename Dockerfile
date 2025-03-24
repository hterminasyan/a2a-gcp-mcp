# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app listens on (adjust if needed, Express default is 3000)
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]