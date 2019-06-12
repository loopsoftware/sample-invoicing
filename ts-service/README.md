# Compile typescript service

1. Install npm dependencies
    ```bash
    npm install
    ```
1. Compile typescript
    ```bash
    ./node_modules/.bin/tsc -p ./
    ```
1. Compile image
    ```bash
    cp package.json dist/ts-service/src/index.js
    cd ../../tools
    npm run create-service-image -- \
       --corefw=yupana-framework-core \
       --servicePath=../sample-invoicing/ts-service/dist/ts-service/src \
       --company=yupana \
       --dockerReg=yupana 
    ```
