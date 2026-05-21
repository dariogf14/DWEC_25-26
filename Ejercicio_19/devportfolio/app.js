const express=require('express');const path=require('path');const fs=require('fs');const session=require('express-session');const morgan=require('morgan');require('dotenv').config();
const authRoutes=require('./routes/authRoutes');const portfolioRoutes=require('./routes/portfolioRoutes');const dashboardRoutes=require('./routes/dashboardRoutes');
const app=express();app.set('view engine','ejs');app.set('views',path.join(__dirname,'views'));app.use(express.urlencoded({extended:true}));app.use(express.static(path.join(__dirname,'public')));
if(process.env.NODE_ENV==='production'){app.use(morgan('combined'));}else{const s=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});app.use(morgan('combined',{stream:s}));}
app.use(session({secret:process.env.SESSION_SECRET||'devportfolio_secret',resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:'lax',secure:false}}));
app.use((req,res,next)=>{res.locals.currentUser=req.session.user||null;next();});
app.get('/',(req,res)=>res.render('home',{title:'DevPortfolio'}));
app.use('/',authRoutes);app.use('/',portfolioRoutes);app.use('/dashboard',dashboardRoutes);
app.use((req,res)=>res.status(404).render('error',{title:'Página no encontrada',message:'La página solicitada no existe.'}));
const PORT=process.env.PORT||3000;if(process.env.NODE_ENV!=='production'){app.listen(PORT,()=>console.log(`Servidor disponible en http://localhost:${PORT}`));}module.exports=app;
