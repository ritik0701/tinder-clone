import express from "express";
import mongoose from "mongoose";
import cards from './dbCards.js'
import Cors from 'cors';

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:1A1seufQFT6ybeah@cluster0.enu2x.mongodb.net/tinderdb?retryWrites=true&w=majority";
// mongodb+srv://admin:kSKncRLX8wJTM3rC@cluster0.enu2x.mongodb.net/tinderdb?retryWrites=true&w=majority
//middlewares
app.use(express.json());
app.use(Cors());

//dbconfigpassword(1A1seufQFT6ybeah)
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

//end point API
app.get('/',(req,res) => res.status(200).send("Hello Ritik !!!") );

app.post("/tinder/cards",(req,res) => {
    const dbCard = req.body;

    cards.create(dbCard , (err,data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });

});

app.get("/tinder/cards",(req,res) => {
    cards.find((err,data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });

});

//listener
app.listen(port, ()=> console.log(`Listening on localhost:${port}`));