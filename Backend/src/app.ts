import express from 'express';
import eventRequestRoutes from './routes/eventRequestRoutes';
import supplierRoutes from './routes/supplierRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import eventSupplierRoutes from './routes/eventSupplierRoutes';
import guestRoutes from './routes/guestRoutes';
import photographerRoutes from './routes/photographerRoutes';
import locationRoutes from './routes/locationRoutes';
import cateringRoutes from './routes/cateringRoutes';
import speakerRoutes from './routes/speakerRoutes';
import registerSupplierRoute from './routes/registerSupplierRoutes';
import authRoutes from './routes/auth.routes';
import filterSuppliersRoutes from "./routes/filterSuppliersRoutes";

const app = express();

app.use(express.json());

app.use('/api', eventRequestRoutes);
app.use('/api', supplierRoutes);
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', eventSupplierRoutes);
app.use('/api', guestRoutes);
app.use('/api', photographerRoutes);
app.use('/api', locationRoutes);
app.use('/api', cateringRoutes);
app.use('/api', speakerRoutes);
app.use('/api', registerSupplierRoute);
app.use('/api/auth', authRoutes);
app.use("/api", filterSuppliersRoutes);

export default app;