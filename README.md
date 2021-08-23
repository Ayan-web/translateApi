
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


## Installation


```sh
# clone repo 
git clone https://github.com/Ayan-web/translateApi.git api

cd api
npm install
 ```

## Running

```sh
npm start
> translateRESTApi@1.0.0 start
> node src/index.js

listening on http://localhost:8080
```
## Consuming 

the uri syntax in <br>
`http://localhost:8080/text/source-target`
```sh
curl -s http://localhost:8080/hello/en-bn  

{"text":"hello","from":"en","to":"bn","translation":"নমস্কার"}                                               
```

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
