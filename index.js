app.use(express.json());
app.use(express.urlencoded({extended: true}));

const Sequelize = require("sequelize")
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database.')
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err)
    })

app.get("/", (req, res) => {
    res.json({message: "Welcome to sequelize application."});
});
