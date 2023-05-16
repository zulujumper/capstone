const { Router } = require("express");
const axios = require("axios").default;

const router = Router();

router.get("/locations/:zipCode", (request, res) => {

  const options = {
    method: 'POST',
    url: 'https://api-ce.kroger.com/v1/connect/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ZWdnYnVkZHktOGZhNWFiZmM3ZThiYjllZjYwMDEzN2FjMzg2NDFkZGYxOTAwOTMwMjM1OTUzODIzODE4OkEtSm9hVndETnhCaE4wdGJsbGhxcndiaWYwU2VhNDZROXowYWg2dkM='
    },
    data: {grant_type: 'client_credentials', scope: 'product.compact'}
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    const token = response.data.access_token;

    const locationOptions = {
      method: 'GET',
      url: 'https://api-ce.kroger.com/v1/locations',
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {'filter.zipCode.near': request.params.zipCode}
    };
    axios.request(locationOptions).then(function (locationResponse) {
      console.log(locationResponse.data);
      res.json(locationResponse.data);
    }).catch(function (error) {
      console.error(error);
    });

  }).catch(function (error) {
    console.error(error);
  });
})

router.get("/products/:storeLocation", (request, res) => {

  const options = {
    method: 'POST',
    url: 'https://api-ce.kroger.com/v1/connect/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ZWdnYnVkZHktOGZhNWFiZmM3ZThiYjllZjYwMDEzN2FjMzg2NDFkZGYxOTAwOTMwMjM1OTUzODIzODE4OkEtSm9hVndETnhCaE4wdGJsbGhxcndiaWYwU2VhNDZROXowYWg2dkM='
    },
    data: {grant_type: 'client_credentials', scope: 'product.compact'}
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    const token = response.data.access_token;

    const productOptions = {
      method: 'GET',
      url: 'https://api-ce.kroger.com/v1/products',
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        'filter.term': 'eggs',
        'filter.locationId': request.params.storeLocation
      }
    };
    axios.request(productOptions).then(function (productResponse) {
      console.log(productResponse.data);
      res.json(productResponse.data);
    }).catch(function (error) {
      console.error(error);
    });

  }).catch(function (error) {
    console.error(error);
  });
})

module.exports = router;