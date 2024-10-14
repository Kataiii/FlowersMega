FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

COPY *.env ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# COPY ./dist ./dist
# Expose the application port (if necessary)
# EXPOSE 5000

# RUN npm run build

# Start the Nest.js application
CMD [ "npm", "run", "start:dev" ]
