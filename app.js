const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();


// Vistas y recursos estáticos
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    if (process.env.MAINTENANCE_MODE === 1) {
        res.status(503).render('503');
    }
    next();
})

app.set('view engine', 'ejs');
app.set('views', './views');

// Formularios
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Rutas
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const userApiRouter = require('./routes/api/userRouter');
const productApiRouter = require('./routes/api/productRouter');
const categoryApiRouter = require('./routes/api/categoryRouter');
const brandApiRouter = require('./routes/api/brandRouter');
const productImageApiRouter = require('./routes/api/productImageRouter');

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/products', productRouter);

app.use('/api/user', userApiRouter);
app.use('/api/product', productApiRouter);
app.use('/api/category', categoryApiRouter);
app.use('/api/brand', brandApiRouter);
app.use('/api/productImage', productImageApiRouter);

// Iniciamos el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));