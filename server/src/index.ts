import express from 'express';
import bodyParser from 'body-parser';
import { listings } from './listings';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => res.send(`one + two = ${one + two}`));

// Listings
app.get('/listings', (_req, res) => {
  return res.send(listings);
});

//Delete Listing
app.post('/delete-listings', (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1));
    }
  }

  return res.send('Failed to delete thing');
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
