import express from 'express';
import eventRequestRoutes from './routes/eventRequestRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import eventSupplierRoutes from './routes/eventSupplierRoutes';
import guestRoutes from './routes/guestRoutes';
import photographerRoutes from './routes/photographerRoutes';
import locationRoutes from './routes/locationRoutes';
import cateringRoutes from './routes/cateringRoutes';
import speakerRoutes from './routes/speakerRoutes';
import registerSupplierRoute from './routes/registerSupplierRoutes';

const app = express();

app.use(express.json());

// רישום כל הנתיבים תחת /api
app.use('/api', eventRequestRoutes);
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', eventSupplierRoutes);
app.use('/api', guestRoutes);
app.use('/api', photographerRoutes);
app.use('/api', locationRoutes);
app.use('/api', cateringRoutes);
app.use('/api', speakerRoutes);
app.use('/api', registerSupplierRoute);

export default app;