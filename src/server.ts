import express, { Request, Response } from 'express';

const app = express();
const port = 5000;  // Vous pouvez choisir un autre port

// Middleware pour récupérer l'adresse IP
app.get('/api/get-ip', (req: Request, res: Response) => {
  // Utilisation de req.socket.remoteAddress au lieu de req.connection.remoteAddress
  const ipAddress = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress;
  
  // Renvoi de l'IP dans la réponse
  res.json({ ip: ipAddress });
});

app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`);
});
