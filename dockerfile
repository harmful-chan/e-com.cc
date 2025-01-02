FROM node:20.17-alpine
WORKDIR /app
COPY . .
RUN npm config set registry && cd api && npm install  && npx prisma generate
# RUN cd ../ui && npm install
EXPOSE 3000

# CMD ["npm", "run", "start"]