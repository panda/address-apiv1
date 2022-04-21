# Dockerfile
FROM node:16

# enter directory
WORKDIR /home/lob-apiv1

# copy package jsons over
COPY package*.json ./

# install npm packages
RUN npm install

# not really production, but good habit
RUN npm ci --only=production

# bundle with all files
COPY . .

# set env vars (app uses process.env)
RUN export port=8080

# expose container port
EXPOSE 80

# npm script
CMD [ "npm", "run", "production"]