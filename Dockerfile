# For Railway
ENV PORT=80
EXPOSE $PORT

# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Angular app
RUN npm run build -- --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the previous stage
COPY --from=build /app/dist/kanban/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]