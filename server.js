import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import employeeInfoRoutes from './routes/employee.js'
import managementRoutes from './routes/management.js'
import dbConnect from './config/database.js'
import transactionsRoutes from './routes/transaction.js'
import getClients from './routes/client.js'
import projectRoutes from './routes/projects.js'
import departmentRoutes from './routes/department.js';
import teamRoutes from './routes/projectTeam.js'
import authRoutes from './routes/auth.js'
// Configuration- middleware setup
const app=express()
dotenv.config()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"})) // allows us to make cross- origin sharing request
app.use(morgan("common")) // to make api calls from another server
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
// Routes
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/employeeInfo",employeeInfoRoutes)
app.use("/management",managementRoutes);
app.use("/transactionsDetails",transactionsRoutes);
app.use("/clientData",getClients)
app.use('/projectData', projectRoutes);
app.use('/departmentData',departmentRoutes);
app.use('/teamData',teamRoutes);
app.use('/auth',authRoutes)
// connection to db
dbConnect();
// Call insertData to insert data
// insertData();
const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    // console.log(`Server started successfully at Port ${PORT}` )
    
})
app.get('/',(req,res)=>{
    res.send(`<h1>ADMIN PORTAL SYSTEM</h1>`)
})