# sample-invoicing

## compile:

 - `npm install`
 - compile classes to typescript:
    ``` 
    cd ../tools
    npm run compile-package -- --pkgPath=../sample-invoicing --pkgOutput=./compile --fwPath=../Yupana-Framework --tsOutput=../sample-invoicing/node_modules
    ```
 - compile typescript to javascript:
   ``` 
     ./node_modules/.bin/tsc -p ./
   ```
 - compile package:
    ``` 
    cd ../tools
    npm run compile-package -- --pkgPath=../sample-invoicing --pkgOutput=./compile --fwPath=../Yupana-Framework
    ```
   
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
