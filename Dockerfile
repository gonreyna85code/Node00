FROM balenalib/%%BALENA_MACHINE_NAME%%-node:latest
RUN apt-get update && apt-get install python make g++ -y
RUN install_packages git
WORKDIR /
COPY package*.json ./
COPY config*.json ./
RUN npm install
COPY . ./
ENV UDEV=1
CMD ["npm", "start"]  