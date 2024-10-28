#para obtener la imagen base
FROM node:16-alpine AS builder

#para definir el directorio de trabajo
WORKDIR /app

#para copiar el archivo de dependencias del proyecto
COPY package*.json /app/

#para instalar las dependencias del proyecto
RUN npm install

#para copiar el codigo del proyecto
COPY . /app

#para construir la aplicacion angular
RUN npm run build --prod

#etapa de nginx
FROM nginx:alpine

#copiar el contenikdo del build de angular
COPY --from=builder /app/dist/angular-frontend /usr/share/nginx/html

#para exponer el puerto 80 del container
EXPOSE 80

#comando por defecto de nginx
CMD [ "nginx", "-g", "daemon off;" ]
