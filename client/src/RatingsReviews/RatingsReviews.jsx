import React from 'react';
import axios from 'axios';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewTile from './ReviewTile.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewForm from './ReviewForm.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.tempReview = 17762;
    this.state = {
      loadedReviews: false,
      loadedMeta: false,
      product_id: this.tempReview,
      filters: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/api/reviews/?product_id=${this.tempReview}`)
      .then((data) => {
        this.setState({
          loadedReviews: true,
          product_id: this.tempReview,
          reviews: data.data.results,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`/api/reviews/meta?product_id=${this.tempReview}`)
      .then((data) => {
        this.setState({ meta: data.data, loadedMeta: true });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { loadedMeta, loadedReviews } = this.state;
    if (loadedReviews === false || loadedMeta === false) {
      return <div />;
    }
    // Get two reviews.
    const tiles = [];
    for (let i = 0; i < 2; i += 1) {
      tiles.push(<ReviewTile item={product_id} key={i} review={this.state.reviews[i]} />);
    }
    const { product_id, filters, meta } = this.state;
    return (
      <div>
        <div className="rr-parent" id="overview-link">
          Ratings & Reviews
          <div className="rr-rating-big" />
          {tiles}
        </div>
        <div className="rr-rating-breakdown">
          <RatingBreakdown productId={product_id} filters={filters} />
        </div>
        <div className="rr-product-breakdown-container">
          <ProductBreakDown characteristics={this.state.meta.characteristics} />
        </div>
        <div>
          <ReviewForm productTitle="Some Title" metaData={meta} />
        </div>
      </div>
    );
  }
}

export default RatingsReviews;
