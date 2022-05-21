# Multi stage build
FROM node:14.14.0-alpine3.12 as builder
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prod.env .
COPY swagger.yaml .
RUN ls -a
RUN npm install
RUN npm run build


FROM builder as production-build-stage
WORKDIR /usr
COPY package.json ./
COPY prod.env .
COPY swagger.yaml .
RUN npm install --only=production
COPY --from=builder /usr/dist /usr/dist
EXPOSE 3000
CMD ["npm","start"]