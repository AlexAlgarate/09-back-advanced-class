import express from 'express';
import mongoose from 'mongoose';

const app = express();

try {
  await mongoose.connect(
    'mongodb://admin:admin123@localhost:27017/db?authSource=admin',
  );
  console.log('Mongodb connected!');
} catch (error) {
  console.log('Mongodb error', error);
}

app.get('/example', (req, res) => {
  res.json({
    info: 'first endpoint',
  });
});

app.listen(3000, () => {
  console.log('Up & running on port: ', 3000);
});
