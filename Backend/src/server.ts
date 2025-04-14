import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './config/db';
import { syncDatabase } from './models';
import app from './app';

const PORT = process.env.PORT || 3000;


// Routes tabels DB
import userRoutes from './routes/userRoutes';
app.use("/api", userRoutes);

import eventRoutes from './routes/eventRoutes';
app.use("/api", eventRoutes);

import eventSupplierRoutes from './routes/eventSupplierRoutes';
app.use('/api', eventSupplierRoutes);

import guestRoutes from "./routes/guestRoutes";
app.use("/api", guestRoutes);

import photographerRoutes from "./routes/photographerRoutes"; // נשתמש לא לרישום אלא להצגה\חיפוש\עידכון של ספקים ספציפיים
app.use("/api", photographerRoutes);

import locationRoutes from "./routes/locationRoutes"; // נשתמש לא לרישום אלא להצגה\חיפוש\עידכון של ספקים ספציפיים
app.use("/api", locationRoutes);

import cateringRoutes from "./routes/cateringRoutes"; // נשתמש לא לרישום אלא להצגה\חיפוש\עידכון של ספקים ספציפיים
app.use("/api", cateringRoutes);

import speakerRoutes from "./routes/speakerRoutes"; // נשתמש לא לרישום אלא להצגה\חיפוש\עידכון של ספקים ספציפיים
app.use("/api", speakerRoutes);

import registerSupplierRoute from "./routes/registerSupplierRoutes"; //יוצר ספק חדש ומכניס גם לטבלת suppliers וגם לסוג הספציפי (DJ, צלם וכו')
app.use("/api", registerSupplierRoute);

// Start the server and connect to the database

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to the database.');

    await syncDatabase();
    console.log('✅ Models synced successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting the server:', error);
    process.exit(1);
  }
};


//אם אתה רוצה לראות את הפילטור אפשר מפה
//import { filterRelevantSuppliers } from "./services/filterRelevantSuppliers";


// פה את שולח לפונקציה את מספר הREQUEST
//filterRelevantSuppliers(1);

// Run the server
startServer();

