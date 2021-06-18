# pull official base image
FROM node:16.3.0-alpine

# port
EXPOSE 3000

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# env
ENV REACT_APP_BACKEND_URL=http://temp.flashaio.com:4000
ENV REACT_APP_FIREBASE_API_KEY=AIzaSyB8CR98CQGJlDWEYavEJOr0xrTUeVIOE8Y
ENV REACT_APP_FIREBASE_PROJECT_ID=wicked-problems
ENV REACT_APP_FIREBASE_DATABASE_URL=https://wicked-problems.firebaseio.com
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=wicked-problems.firebaseapp.com

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 1000000
RUN yarn add react-scripts@4.0.3 -g

# add app
COPY . ./

# start app
CMD ["yarn", "start"]