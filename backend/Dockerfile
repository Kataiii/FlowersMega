FROM node:16

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

COPY *.env ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the application port (if necessary)
EXPOSE 5000

# Start the Nest.js application
CMD [ "npm", "run", "start:dev" ]
