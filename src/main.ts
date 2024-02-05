import './bootstrap'
import "reflect-metadata"
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import authMiddleware from './middlewares/auth.middleware';
import invoiceRouter from './routes/invoice.route';
import productRouter from './routes/product.route';
import cors from 'cors'
import webhookRouter from './routes/webhook.route';
import invoiceReceivedRouter from './routes/invoice-received.route';
import './events-handler/event.handler'
const app: Express = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/webhook', webhookRouter)
app.use('/invoice', invoiceRouter)
app.use('/invoice-received', invoiceReceivedRouter)
app.use('/product', productRouter)
app.use('/auth', authRouter)
app.use(authMiddleware)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})  