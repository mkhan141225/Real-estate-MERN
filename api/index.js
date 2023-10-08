import express from 'express'
import cors from "cors"
import colors from 'colors'

const app=express()
app.use(cors())

app.get('/',(req,res)=>{
    res.send("<h1>welcome</h1>")
})
app.listen(3000,()=>{console.log("server is running on port 3000" .bgCyan.white)})