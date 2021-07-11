# pull official base image
FROM node:16.3.0-alpine

# port
EXPOSE 3000

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# env
ENV REACT_APP_BACKEND_URL=/api
ENV REACT_APP_SOCKET_URL=https://wickedproblems.io/api
ENV REACT_APP_FIREBASE_API_KEY=AIzaSyB8CR98CQGJlDWEYavEJOr0xrTUeVIOE8Y
ENV REACT_APP_FIREBASE_PROJECT_ID=wicked-problems
ENV REACT_APP_FIREBASE_DATABASE_URL=https://wicked-problems.firebaseio.com
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=wicked-problems.firebaseapp.com
ENV REACT_APP_FIREBASE_MEASURMENT_ID=G-NK8S70NME7
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=711756745961
ENV REACT_APP_FIREBASE_APP_ID=1:711756745961:web:cb2f44d663bc873802b478
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=wicked-problems.appspot.com
ENV NODE_ENV=production

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 1000000
RUN yarn add react-scripts@4.0.3 -g

# add app
COPY . ./

# build app
RUN yarn build

# start app
CMD ["yarn", "serve", "-s", "build", "-l", "3000"]