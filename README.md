# daw-grupo-15
Proyecto final para desarrollo de aplicaciones web. APLICACIÓN DE EDUCACIÓN AMBIENTAL PARA ESCUELAS

## Pre requisitos
- node.js v20.11.0  
- npm 10.4.0
- docker (Docker version 25.0.2, build 29cf629)

### Instalación node.js con nvm en ubuntu
- https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04

### Instalación de docker en ubuntu
- https://docs.docker.com/engine/install/ubuntu/

### Utilizar ubuntu como subsistema con WSL en Windows
- https://learn.microsoft.com/es-es/windows/wsl/install

### Importar Base de Datos

```shell
psql -U postgres -h localhost -d dbenvironeducationdev -f database/backup.sql

```
