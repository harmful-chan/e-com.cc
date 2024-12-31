FROM node:20.17-alpine
WORKDIR /app
COPY . .
RUN npm config set registry 
RUN npm install 
RUN npx prisma generate
EXPOSE 3000

CMD ["npm", "run", "start"]