/* eslint-disable no-undef */
const MAIN_USER = {
    "id": "eace59be-792e-4aad-8dfb-43f4e12bafee",
    "login": "travis@devloop.onmicrosoft.com",
    "issuedBy": "https://sts.windows.net/c90eb054-e079-437d-9976-58f09521fbc9/",
    "language": "fre",
    "currency": "EUR",
    "firstname": "travis",
    "name": "Travis",
    "domain": "KPMG",
    "active": true,
    "email": "travis@devloop.onmicrosoft.com",
    "roles": [
        {
            "name": "testRole",
            "version": "1.2.3",
            "defaultRole": true
        }
    ],
    "profile": "5.0",
    "localPermissions": {},
    "ext": {}
};

const TEST_USER = {
    "id": "ab12d6e4-7ce8-48a9-a570-5c636b4c073b",
    "login": "bob@your-uncle.com",
    "issuedBy": "https://sts.windows.net/c90eb054-e079-437d-9976-58f09521fbc9/",
    "language": "eng",
    "currency": "EUR",
    "firstname": "bob",
    "name": "Bob",
    "domain": "LOOP",
    "active": true,
    "email": "bob@your-uncle.com",
    "roles": [
        {
            "name": "testRole",
            "version": "1.2.3",
            "defaultRole": true
        }
    ],
    "profile": "5.0",
    "localPermissions": {},
    "ext": {}
};

db = db.getSiblingDB('admin');
db.createUser({"user": "user", "pwd": "admin", "roles": ["readWriteAnyDatabase"]});
db = db.getSiblingDB('YPN_cache');
db.createCollection("classesDocumentation", {autoIndexId: true});
db.createCollection("databases", {autoIndexId: true});
db.createCollection("processes", {autoIndexId: true});
db.createCollection("services", {autoIndexId: true});
db.createCollection("sessions", {autoIndexId: true});
db.createCollection("swaggerScheme", {autoIndexId: true});
db.createCollection("users", {autoIndexId: true});
db.createCollection("activeUsers", {autoIndexId: true});
db.createCollection("rooms", {autoIndexId: true});
db.createCollection("notifications", {autoIndexId: true});
db.createCollection("eventsPending", {autoIndexId: true});
db.createCollection("rights", {autoIndexId: true});
db = db.getSiblingDB('YPN_logs');
db.createCollection("logs", {autoIndexId: true});
db.createCollection("perfmon", {autoIndexId: true});
db = db.getSiblingDB('YPN_cache');
db.users.insert(MAIN_USER);
db.users.insert(TEST_USER);
