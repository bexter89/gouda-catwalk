
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, makeStyles, IconButton, MoreVertIcon, Button } from '@material-ui/core';
import Stars from '../rating-review/StarRating.jsx';
import RemoveOutfitButton from './removeOutfitButton.jsx';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 200,
  },
});

const OutfitProductCard = (props) => {
  const classes = useStyles();
  const [productInfo, setProductInfo] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const prodId = props.productId;

  const getProductInfo = () => {
    axios.get('http://localhost:1337/getProductInfo/', { params: { product_id: prodId } })
      .then((response) => {
        setProductInfo(response.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  const getImage = () => {
    axios.get('http://localhost:1337/getImage/', { params: { product_id: prodId } })
      .then((response) => {
        setProductImage(response.data.results[0].photos[0].thumbnail_url);
      }).catch((error) => {
        console.log(error);
        setProductImage("https://via.placeholder.com/300x300");
      });
  };

  useEffect(() => {
    getProductInfo();
  }, []);
  useEffect(() => {
    getImage();
  }, []);

  return productInfo && (
    <div>
      <Card>
        <CardContent>
          <RemoveOutfitButton onClick={() => { props.onClick(prodId) }} />
          <CardMedia className={classes.media} image={productImage || "https://via.placeholder.com/300x300"} />
          <Typography variant="body1"> {productInfo.category} </Typography>
          <Typography variant="body1" style={{ fontWeight: 600 }}>{productInfo.name} </Typography>
          <Typography variant="body1">{productInfo.default_price} </Typography>
        </CardContent>
        <Stars rating={2.5} />
      </Card>
    </div>
  );
}

export default OutfitProductCard;