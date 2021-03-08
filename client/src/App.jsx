import React from 'react';
import axios from 'axios';
import style from './style.scss';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import Overview from './Overview/Overview.jsx';
import RelatedItemsAndComparison from './RelatedItemsAndComparison/RelatedItemsAndComparison.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      selectedProduct: null,
      questions: {},
      selectedStyle: null
    };
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.changeSelectedStyle = this.changeSelectedStyle.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
    this.getProduct();
  }

  getAllProducts() {
    axios
      .get('api/products?count=*')
      .then((data) => {
        // data.data is an array of all products, where each product is an object
        this.setState({
          allProducts: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProduct(productID = 17762) {
    axios
      .get(`api/products/${productID}`)
      .then((product) => this.setState({ selectedProduct: product.data }))
      .then(() => this.getQuestions());
  }

  getQuestions() {
    axios
      .get(`api/qa/questions/?product_id=${this.state.selectedProduct.id}`)
      .then((questions) => {
        this.setState({
          questions: questions.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeSelectedStyle(selectedStyle) {
    this.setState({
      selectedStyle: selectedStyle
    })
  }

  render() {
    const { selectedProduct } = this.state;
    let RatingsReviewsSection = <div />;
    if (selectedProduct !== null) {
      RatingsReviewsSection = <RatingsReviews productData={selectedProduct} />;
    }
    return (
      <div className="main-app">
        {/* react is up and running */}
        {/* need to pass in what item we're on here */}
        {this.state.selectedProduct && (
          <Overview
            changeSelectedStyle={this.changeSelectedStyle}
            selectedProduct={selectedProduct}
            selectedProductId={this.state.selectedProduct.id}
          />
        )}
        <RelatedItemsAndComparison
          selectedProduct={this.state.selectedProduct}
          changeProduct={this.getProduct}
        />
        {this.state.questions.results && (
          <QuestionsAndAnswers
            selectedProduct={this.state.selectedProduct}
            selectedProductsQuestions={this.state.questions}
          />
        )}
        <RatingsReviews productData={selectedProduct} />
      </div>
    );
  }
}
export default App;
