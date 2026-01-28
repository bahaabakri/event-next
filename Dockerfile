FROM node:20-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

RUN npm install

# Copy the rest of the source code
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]