const mysqlx = require('@mysql/xdevapi')
require('dotenv').config();

/**
 * makes connection to the mysql
 * @returns Array of current session and table 
 */
exports.connect = async function (){

    const conn = await mysqlx.getSession(
        {
            host : process.env.host,
            port : 33060,
            user : process.env.user,
            password : process.env.password
        }
    )
    const table = await conn.getSchema(process.env.database).getTable(process.env.table)
    return [conn,table]
}

/**
 * @param {String} text - text to translate
 * @param {String} translate - translated `text`
 * @param {String} target - target language
 */

exports.populate = async function(table,text,translate,target)
{
    const count =  await table.count()
    if(count>process.env.cacheSize) 
    {
        await table.delete().where('true').orderBy(["createdtime"]).limit(1).execute()
    }
    await table.insert(['keytext','translate','target']).values(text,translate,target).execute()
}

/**
 * @param {Object} table - table instance returned from connect
 * @param {String} text - text to translate
 * @param {String} target - text to translate
 * @returns {Array} array contaning result
 */
exports.cacheFetch=async function(table,text,target)
{
    const res = await table.select(['keytext','translate'])
                    .where('keytext = :text and target=:target')
                    .bind('text',text)
                    .bind('target',target).execute()
    return res.fetchOne()
}
