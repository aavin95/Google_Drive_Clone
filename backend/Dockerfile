# Use the official Node.js image as a base
FROM node:18 as base

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Run the compiled JavaScript output instead of the TypeScript source files
CMD ["ts-node", "src/index.ts"]