FROM hypriot/rpi-node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#TODO Copy your static files if applicable
#COPY public public
COPY src src
COPY settings.json settings.json
COPY tsconfig.json tsconfig.json

RUN ./node_modules/.bin/tsc

EXPOSE 8090
EXPOSE 1446

ENTRYPOINT [ "npm", "start" ]