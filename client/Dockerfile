# Build phase
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production phase
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
