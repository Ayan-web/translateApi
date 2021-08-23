const supertest = require('supertest')
const mysql = require('@mysql/xdevapi')
const cachingdb = require('../src/cashingDB')
const app = require('../src/server')
const request = supertest(app)
require('dotenv').config();



describe('endpoint testing ',()=>{
    test("get response 200",async () =>{
        const res = await request.get('/hello/en-ja')
        expect(res.statusCode).toBe(200)
    })
    test("maching response with cache db",async ()=>{
      const res = await request.get('/hello/en-ja')

      //getting session and table 
      const [conn,table] = await cachingdb.connect()
      const cacheFetch = await cachingdb.cacheFetch(table,'hello','ja')

      // checking equality 
      expect(res.body.text).toBe(cacheFetch[0])
      expect(res.body.translation).toBe(cacheFetch[1])
      conn.close();
    })
})
describe('cache db test',()=>{
  test("watching that catch size not increasing catch size",async()=>{

    //connneting 
   const [conn,table] = await cachingdb.connect()

   // making requests more than cachesize
  await request.get('/hello/en-ja')
  await request.get('/hello/en-ru')
  await request.get('/hello/en-et')
  await request.get('/hello/en-fa')
  await request.get('/hello/en-az')

  const res = await table.count()
  expect(res).toEqual(Number(process.env.cacheSize))
  conn.close();
  },5000000)
})