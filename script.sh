echo "buildando imagem docker"
docker build -t notas-api .  

echo "subindo container"
docker run --network=host notas-api