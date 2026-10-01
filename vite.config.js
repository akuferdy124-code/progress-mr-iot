import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import projectsHandler from './api/projects.js';
import journalsHandler from './api/journals.js';
import skillsHandler from './api/skills.js';
import authHandler from './api/auth.js';

// Local API dev middleware plugin
function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api')) {
          return next();
        }

        // Mock express/vercel-like helpers
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        // Parse query params
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        req.query = Object.fromEntries(urlObj.searchParams.entries());

        // Parse JSON body for POST/PUT/DELETE
        if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
          }
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch (e) {
            req.body = {};
          }
        }

        const pathname = urlObj.pathname;
        try {
          if (pathname === '/api/projects') {
            return await projectsHandler(req, res);
          } else if (pathname === '/api/journals') {
            return await journalsHandler(req, res);
          } else if (pathname === '/api/skills') {
            return await skillsHandler(req, res);
          } else if (pathname === '/api/auth') {
            return await authHandler(req, res);
          }
        } catch (err) {
          console.error("Local API Handler Error:", err);
          return res.status(500).json({ error: err.message });
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 3000,
    open: false,
  },
});
