echo "buildando imagem docker"
docker build -t notas-api .  

echo "subindo container"
docker run -p 3001:3001 notas-api