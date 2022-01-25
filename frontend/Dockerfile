# ========================#
# Build environment       #
# ========================#

# Use small image
FROM node:14.5.0-alpine3.12 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
# Copy app files
COPY . ./
# Build app
RUN npm run build

# ========================#
# Runtime environment     #
# ========================#

# Use small image
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
# Run static http server as foreground process
CMD ["nginx", "-g", "daemon off;"]
