clear
docker-compose down

docker-compose up -d mongo
sleep 5

docker-compose exec mongo mongo mongoSetup.js
docker-compose up --abort-on-container-exit || exit 1

# npm run create-service-image -- --corefw=yupana-framework-core-integration-test --servicePath=../fy_si/ts-service/dist  --company=yupana  --dockerReg=yupana --integration