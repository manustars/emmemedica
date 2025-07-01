# Containerfile per servire i file statici con Nginx
FROM nginx:1.25-alpine

# Copia la configurazione personalizzata di Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia tutti i file statici nella directory di default di Nginx
COPY . /usr/share/nginx/html

# Espone la porta 80
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
