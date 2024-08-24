# Use the official Node.js image from the Docker Hub
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port that your Node.js app runs on
EXPOSE 3000

# Set environment variables for connecting to the RDS database
ENV DB_HOST=database-1.c5gw0is62vmi.ap-south-1.rds.amazonaws.com
ENV DB_USER=admin
ENV DB_PASSWORD=123456789
ENV DB_NAME=testdb

# Command to run the Node.js application
CMD ["node", "app.js"]
