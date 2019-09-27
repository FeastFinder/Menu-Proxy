const newrelic = require('newrelic');
const express = require('express');
const axios = require('axios');
const url = require('./urls');

const app = express();
const port = 3000;
const { menusUrl } = url;

app.use('/restaurants/:id', express.static('public'));
app.use(express.static('public'));

app.get('/api/restaurants/:id/menu', (req, res) => {
  const { id } = req.params;
  axios.get(`${menusUrl}/api/restaurants/${id}/menu`)
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.listen(port, () => console.log('port ' + port + ' is listening...'));
