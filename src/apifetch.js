const {translate} = require('bing-translate-api')
const db = require('./cashingDB')

/**
 * translator api remotefetch
 * @constructor
 * @param {string} text - Text to translate.
 * @param {string} from - Source language.
 * @param {string} to - Target language.
 * @return {{text:string, from: string, to: string}} translated `text` with `form` and `to`.
 */
exports.apiCall = function (text,source,target)
{
    return Promise.resolve().then(async ()=>{
        const [conn,table] = await db.connect()
        const cache = await db.cacheFetch(table,text,target);
        if(cache)
        {
            return {
                text:cache[0],
                from :source,
                to:target,
                translation:cache[1]
            }
        }
        const res = await translate(text,source,target,true)
        if(res)
        {
            await db.populate(table,text,res.translation,target)
            return {
                text:res.text,
                from:res.language.from,
                to:res.language.to,
                translation:res.translation
            }
        }
    })
}
