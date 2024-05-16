cd daw-grupo-15
git pull origin master

# Verificar si hay contenedores Docker en ejecución
if docker ps -q > /dev/null 2>&1; then
    echo "Deteniendo contenedores existentes..."
    docker-compose down
    docker-compose build
    docker-compose up -d
else
    echo "Construyendo y levantando contenedores..."
    docker-compose build
    docker-compose up -d
fi
