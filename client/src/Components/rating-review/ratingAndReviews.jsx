import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ProductReview from './productReview.jsx';
import SortReviews from './reviewSorting.jsx';
import ReviewList from './reviewList.jsx';
import dummyData from './dummy_data.jsx';

const RatingAndReviews = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [productId, setProductId] = useState(props.productId);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(2);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [sortOrder, setSortOrder] = useState('relevent');
  const [characteristics, setCharacteristics] = useState({});

  const getReviews = () => {
    if (productId) {
      const params = {
        page: 1,
        count: totalReviewCount || reviewCount,
        sort: sortOrder,
        product_id: productId,
      };
      axios
        .get('/reviews', { params })
        .then((reviewData) => {
          console.log('we good');
          setReviews(reviewData.data.results);
        })
        .catch((err) => {
          console.log('fuj');
          console.log(params);
          console.log(err);
        });
    }
  };

  useEffect(getReviews, [productId, sortOrder, totalReviewCount]);

  useEffect(() => {
    setProductId(props.productId);
  }, [props]);

  // eslint-disable-next-line camelcase
  const handleReport = (review_id) => {
    axios
      .put('/review/report', { reviewId: review_id })
      .then((reportResponse) => {
        const params = {
          page: 1,
          count: totalReviewCount || reviewCount,
          sort: sortOrder,
          product_id: productId,
        };
        return axios.get('/reviews', { params });
      })
      .then((reviewData) => {
        // reviews don't actually get updated
        setReviews(reviewData.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <h2> Ratings Reviews </h2>
          <ProductReview
            setChar={setCharacteristics}
            productId={productId}
            setMoreReviews={setTotalReviewCount}
            totalReviewCount={totalReviewCount}
          />
        </Grid>

        <Grid item xs={8}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            <SortReviews
              sortType={sortOrder}
              count={reviews.length}
              changeSort={setSortOrder}
              resetCount={setReviewCount}
            />
            <ReviewList
              reviews={reviews}
              count={reviewCount}
              setReviewCount={setReviewCount}
              handleReport={handleReport}
              productId={productId}
              characteristics={characteristics}
              updateReviews={getReviews}
            />
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
    </div>
  );
};

export default RatingAndReviews;
