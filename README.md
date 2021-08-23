
# Translate Api 

translation api that uses [bing-translate-apid](https://github.com/plainheart/bing-translate-api)

## Designing 

the app is divided into 4 modules

- `server.js` <br>
this is the main api server that recives calls 

- `apiFetch.js`<br>
this module act between the `server.js` and the `cachingDB.js` is mainly for remote api for translate and for giving data to `cashingDB.js`

- `cachingDB.js` <br>
takes care of the cache db like __updating cache__,__deleting old entries__ .

<image src='assets/Slide 16_9 - 1(1).png' alt='system design'>

### in remote
in this senario we expect the result is in remote and not in cache .
- 1 end user makes request to the server
 - 2 `server.js` makes a request to (following arrow 3 )`apiFetch.js` which then makes a request to `caching.js` (following arrow 5 )to check the cache server where it gets a cache miss it returns undefined. following arrow 6
 - 7 `apiFetch.js` makes a request to `remote api` and gets the result (arrow 8 ) `apiFetch.js` stores the data following the paths then finally returns to `server.js` it then send response to the end user.

## in cache 

 - 1 end user makes request to the server
  - 2 `server.js` makes a request to (following arrow 3 )`apiFetch.js` which then makes
  - `apifetch` makes a request to `cachedb.js` via 3 then gets response following 5 and 4 returns responce following path 6 9 10 



## Installation


```sh
# clone repo 
git clone https://github.com/Ayan-web/translateApi.git api

cd api
npm install
 ```

add a `.env` in the root of the project with the following
```sh
cat .env
PORT=8080 # server port
host=localhost #server hosting address
user=dataconnect # database username
password=connectplease # database password
database=caching # database/schema name
table=cache # table name
cacheSize=2 # cache size

```
```sh
## Running

```sh
npm start
> translateRESTApi@1.0.0 start
> node src/index.js

listening on http://localhost:8080
```
## Testing

we have used `jest` and `supertest` to end to end test 
```sh
npm test
> translateRESTApi@1.0.0 test
> jest

 PASS  tests/api.test.js (14.938 s)
  endpoint testing 
    ✓ get response 200 (4840 ms)
    ✓ maching response with cache db (55 ms)
  cache db test
    ✓ watching that catch size not increasing catch size (9046 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        15.033 s, estimated 20 s
Ran all test suites.
```

## Consuming 

the uri syntax in <br>
`http://localhost:8080/text/source-target`
```sh
curl -s http://localhost:8080/hello/en-bn  

{"text":"hello","from":"en","to":"bn","translation":"নমস্কার"}                                               
```
for target and source follow [lang.js](https://github.com/plainheart/bing-translate-api/blob/master/src/lang.js).
## Caching
we have used FIFO caching policy for this project 
as it is the easiest to implement.
we are using MySql 8 as cache database.
```sql
mysql> desc cache;
+-------------+-------------+------+-----+-------------------+-------------------+
| Field       | Type        | Null | Key | Default           | Extra             |
+-------------+-------------+------+-----+-------------------+-------------------+
| keytext     | varchar(20) | NO   |     | NULL              |                   |
| translate   | varchar(40) | NO   |     | NULL              |                   |
| target      | varchar(4)  | NO   |     | NULL              |                   |
| createdtime | timestamp   | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| id          | tinyint     | NO   | PRI | NULL              | auto_increment    |
+-------------+-------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)
```
