import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import QuestionsList from './QuestionsList.jsx';
import ButtonGroup from './ButtonGroup.jsx';

export default class QAWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      questionsList: [],
      // eslint-disable-next-line react/no-unused-state
      searchValue: '',
      currentProduct: 38326,
    };
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  handleSearchValue(event) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      searchValue: event.target.value,
    });
  }

  // TODO: Should start search when the searchValue is equal to or greater than 3
  // TODO: Results will populate in the accordian section
  handleSearchSubmit() {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert('submitted');
    const { questionsList, searchValue } = this.state;
    const filteredSearch = (searchStr) => {
      searchStr.toLowerCase();
      const data = questionsList.results;
      const filterData = data.filter((element) => {
        const currQuestion = element.question_body.toLowerCase();
        if (currQuestion.includes(searchStr)) {
          return currQuestion;
        }
      });

      // TODO: need to display the results in the accordian
    };
    filteredSearch(searchValue);
  }

  // TODO: Need to have this grab the current product_id from product overview
  getQuestions() {
    const { currentProduct } = this.state;
    axios
      .get('/getQuestions', {
        params: {
          product_id: currentProduct,
          page: 1,
          count: 20,
        },
      })
      .then((response) => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          questionsList: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { questionsList } = this.state;
    return (
      <div className="qa-container">
        <SearchBar />
        <QuestionsList questionsList={questionsList} />
      </div>
    );
  }
}

// axios.get('/getAnswers', {
//   params: {
//     question_id: this.state.product_id,
//     page: this.state.page,
//     count: this.state.count
//   }
// })

// axios.post('/addQuestion', {
//   params: {
//     question_id: this.state.question_id,
//     page: this.state.page,
//     count: this.state.count
//   }
// })

// axios.put('/markQuestion', {
//   params: {
//     question_id: this.state.question_id
//   }
// })
