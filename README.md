# sample-invoicing

## compile:

 - compile classes to typescript:
    ``` 
    cd ../tools
    npm run compile-package -- --pkgPath=../sample-invoicing --pkgOutput=./compile --tsGenerate --fwPath=../Yupana-Framework
    ```
 - _rename `node_modules/yupana/*.d.ts` to `node_modules/yupana/*.ts` (**)_ 
 - compile typescript to javascript:
   ``` 
     ./node_modules/.bin/tsc -p ./
   ```
 - _copy some files from the framework: (**)_
   ``` 
   cp ../Yupana-Framework/server/lib/core/uuid.js ./js-compiled/node_modules/yupana/
   ```
 > _** - while it's a POC_ 
   
## setup

 - create database:
    ```
        /YPND/user/2.4.0.1.2.3/platform/databaseCreate?\
        dbId=simple&\
        packageId=222f55f7-72ef-4fad-81a7-d2a0a869d324&\
        version=1.2.3&\
        namespace=simple&\
        inaccessibleFrom=2029-04-17
    ```
 - prepare database:
    ```
        /YPND/user/2.4.0.1.2.3/platform/databasePrepare?\
        dbId=simple&\
        packageId=222f55f7-72ef-4fad-81a7-d2a0a869d324&\
        version=1.2.3&\
        namespace=simple
    ``` 
 - grant access:
    ```
        /YPND/user/2.4.0.1.2.3/platform/databaseGrant?\
        dbId=simple&\
        login=....&\
        mode=rw 
    ```
