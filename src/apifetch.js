const {translate} = require('bing-translate-api')

function apiCall(text,from,to)
{
    return Promise.resolve().then(async ()=>{
        const res = await translate(text,from,to,true)
        if(res)
        {
        return {
            text:res.text,
            from:res.language.from,
            to:res.language.to,
            translation:res.translation
        }
        }
    })
}

exports.apiCall = apiCall