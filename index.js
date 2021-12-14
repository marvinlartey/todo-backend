import dotenv from 'dotenv';
import express from 'express';
import todoModel from './schema/schema.js';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
//middleware

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const db = process.env.DB_URL;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log(`connected to DB`))
.catch(err => console.log(err));


/* app.get('/home', (req, res) => {
    res.send('Hello World');
})

app.get('/todo', (req, res) => {
    res.send('Welcome to todo Backend Service')
})

app.post('/todo', (req, res) => {
    res.send('use post to create a new todo');
})

app.patch('/home', (req, res) => {
    res.send('Use patch to update some data in the database');
})

app.put('/home', (req, res) => {
    res.send('Use put to update entire data in the database');
})

app.delete('/home', (req, res) => {
    res.send('Use delete to delete a todo');
})*/


 



app.get('/', async (req, res) => {
    res.json({
        message :`Welcome to the todo backend API`
    })
})

app.get(`/todos`,async (req, res) => {
    const allTodos = await todoModel.find({});

    if (allTodos){
        //success
        return res.status(200).json({
            message: `Todos fetched successfully`,
            data: allTodos
        });

    }else{
        //error
        return res.status(500).json({
            message: `Oops! Unable to fetch Todos`
        });
    }
})


// Get all category todos

app.get('/todos/:category', async (req, res) => {
const{category}= req.params;
const allCategoryTodos = await todoModel.find({}).where("category").equals(category);
if(allCategoryTodos){
    //success
    return res.status(200).json({
        message:`${category} Todos fetched successfully`,
        data: allCategoryTodos
    });
    
}else{
        //error
        return res.status(500).json({
            message:`Oops, unable to fetch ${category} todos`
        });
    }

})


//create a new todo
app.post('/todo', async (req, res) => {
    const {todoTitle, category}= req.body;
    const newTodo= await todoModel.create({
        todoTitle,
        category
    });

    if(newTodo){
        //success
        return res.status(200).json({
            message: `Todo created successfully`
        })
    }else{
        return res.status(500).json({
            message: `Todo unable to create `
        })
    }
})


//delete a todo
app.delete(`/todo/:id`, async (req, res)=>{
    const {id}= req.params;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if(deletedTodo){
        return res.status(200).json({
            message: 'Todo deleted successfully'
        })
    }else{
        return res.status(500).json({
            message: 'error deleting todo'})
    }
})






app.listen((PORT),() => {
    console.log(`Your app listening on port ${PORT}`);});
