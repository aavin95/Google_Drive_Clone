FROM node:18

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the application
COPY . .

# Add build step
RUN npm run build

EXPOSE 3000

# Use production start command
CMD ["npm", "start"]