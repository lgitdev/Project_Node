import {
    AngularNodeAppEngine,
    createNodeRequestHandler,
    isMainModule,
    writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sequelize from './database/database';
import transactionRoutes from './routes/transactionRoutes';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware pour traiter les requêtes JSON
app.use(express.json());

/**
 * Serve static files from /browser
 */
app.use(
    express.static(browserDistFolder, {
        maxAge: '1y',
        index: false,
        redirect: false,
    })
);

// Synchronize database
sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized.'))
    .catch(err => console.error('Error synchronizing database:', err));

// Test database connection
app.get('/api/db-check', async (req, res) => {
    try {
        await sequelize.authenticate(); // Checks database connection
        res.status(200).json({ message: 'Database connection successful!' });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: 'Database connection failed.', error: error.message });
    }
});

// Add transaction routes
app.use('/api/transactions', transactionRoutes);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
    angularApp
        .handle(req)
        .then((response) =>
            response ? writeResponseToNodeResponse(response, res) : next(),
        )
        .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 */
if (isMainModule(import.meta.url)) {
    const port = process.env['PORT'] || 4200;
    app.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
