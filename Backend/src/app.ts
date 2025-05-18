import express from 'express';
import qs from 'qs';
import cors from 'cors';
import eventRequestRoutes from './routes/eventRequestRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import eventSupplierRoutes from './routes/eventSupplierRoutes';
import guestRoutes from './routes/guestRoutes';
import photographerRoutes from './routes/photographerRoutes';
import locationRoutes from './routes/locationRoutes';
import cateringRoutes from './routes/cateringRoutes';
import speakerRoutes from './routes/speakerRoutes';
import authRoutes from './routes/auth.routes';
import guestUploadRoutes from './routes/guestUploadRoutes';
import rsvpRoutes from './routes/rsvpRoutes';
import ratingRoutes from './routes/ratingRoutes';
import supplierRoutes from './routes/supplierRoutes';
import createEventFromRequest from "./routes/createEventFromRequest";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: '10mb',
}));

app.use(cors({
  origin: process.env.CLIENT_BASE_URL,
  credentials: true
}));


app.use((req, res, next) => {
  if (req.is('application/x-www-form-urlencoded') && typeof req.body === 'string') {
    req.body = qs.parse(req.body);
  }
  next();
});

app.use('/api', eventRequestRoutes);
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', eventSupplierRoutes);
app.use('/api', guestRoutes);
app.use('/api', photographerRoutes);
app.use('/api', locationRoutes);
app.use('/api', cateringRoutes);
app.use('/api', speakerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/guest-upload', guestUploadRoutes);
app.use('/rsvp', rsvpRoutes);
app.use('/api', ratingRoutes);
app.use('/api', supplierRoutes);
app.use('/api',createEventFromRequest);

export default app;