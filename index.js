
//Server config
const express   = require("express");
const app       = express();
const connectDB = require('./config/db')
const path      =require('path')
//Dependencies


//DB
connectDB();

//Middleware
app.use(express.json({extended: false}))//body parser


//Define Routes
app.use('/api/auth', require('./controller/auth'));
app.use('/api/posts', require('./controller/posts'));
app.use('/api/profile', require('./controller/profile'));
app.use('/api/users', require('./controller/users'));

//Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))
    //Serve the react html file(if you hit any route other than those we defined above)
    app.get( "*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));