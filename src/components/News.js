import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    catogery: PropTypes.number,
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalize(this.props.category)} NewsMonkey`
  }

  async componentDidMount() {
    this.update()
  }


  handlePrevClick = () => {
    this.setState({ page: this.state.page - 1 });
    this.update();


  }

  update = async () => {
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=1caf6ed55f9d4763a9b0e41263c1838a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(data)
    this.setState({
      // page:this.state.page-1,
      articles: parsedData.articles,
      loading: false,
    })
    this.props.setProgress(100)
  }

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 });
    this.update();

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=1caf6ed55f9d4763a9b0e41263c1838a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(data)
    this.setState({
      // page:this.state.page-1,
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
    })

  };

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{ margin: '40px 0px' }}>NewsMonkey-Top {this.capitalize(this.props.category)}  Headlines </h1>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.totalResults}
            loader={<Spinner />}
          >
      <div className="container">
        <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage}
                  newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
              </div>
            })}



        </div>
        </div>
          </InfiniteScroll>


      </div>
    )
  }
}
export default News
