# sample-invoicing

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
