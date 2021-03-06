const app = require('express')()
const api = require('./apifetch')



app.get('/:text/:from-:to',async(req,res)=>{
	const {text, from, to} = req.params
	const response =await api.apiCall(text,from,to)
	if(response)
	{
			res.status(200).send(response)
	}
})


module.exports=app