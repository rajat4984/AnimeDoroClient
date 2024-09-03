# Stage 1: Build the React application
FROM node:16-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the built application using Nginx
FROM nginx:alpine

# Copy the build output from the builder stage to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]
