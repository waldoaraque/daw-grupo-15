# daw-grupo-15

Proyecto final para desarrollo de aplicaciones web. APLICACIÓN DE EDUCACIÓN AMBIENTAL PARA ESCUELAS

## Pre requisitos

- node.js v20.11.0
- npm 10.4.0
- docker (Docker version 25.0.2, build 29cf629)
- psql (PostgreSQL) 16.2 (Ubuntu 16.2-1.pgdg22.04+1)

### Instalación node.js con nvm en ubuntu

- https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04

### Instalación de docker en ubuntu

- https://docs.docker.com/engine/install/ubuntu/

### Utilizar ubuntu como subsistema con WSL en Windows

- https://learn.microsoft.com/es-es/windows/wsl/install

### Instalación de Postgres

En la máquina ubuntu, una vez clonado el repositorio, tenemos disponible la carpeta ```setup/```, en dónde se en cuentra el script de instalación de postgres para el subsistema de ubuntu, ejecutaremos así...

Damos permisos al script:
```shell
chmod 777 setup/pgsql-setup.sh
```

Ejecutamos la instalación:
```shell
source setup/pgsql-setup.sh
```

## Preparación de entorno para desarrollar

### Base de Datos

A continuación, vamos a levantar la base de datos para poder conectar nuestra API Backend de Node.js

#### Configuramos contraseña para el usuario postgres

Nos logamos conel usuario al servicio de postgres:
```shell
sudo -u postgres psql
```

Una vez dentro, configuramos la contraseña para el usuario ```postgres``` con el siguiente comando:
```shell
\password postgres;
```
Y agregamos la contraseña...

#### Creación de la Base de Datos

Dentro de la misma consola de postgres, crearemos la Base de Datos:
```shell
CREATE DATABASE dbenvironeducationdev;
```

Esto creará la base de datos y podremos restaurar el backup que poseemos en la carpeta ```/database``.

Ahora nos salimos a la consola de nuestro ubuntu, y ejecutamos la restauración del backup así:
```shell
psql -U postgres -h localhost -d dbenvironeducationdev -f database/backup.sql

```

#### Testing Unitario con Jest
- https://medium.com/@ben.dev.io/node-js-unit-testing-with-jest-b7042d7c2ad0

- https://jestjs.io/docs/jest-object
