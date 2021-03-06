import React, {Component} from 'react'
import {Input, Button} from 'semantic-ui-react'
import store from '../store/index.js'
import {connect} from 'react-redux'
import {setResults} from '../store/search'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      searchString: ''
    }
  }
  handleChange = evt => {
    this.setState({
      searchString: evt.target.value
    })
  }
  handleSubmit = evt => {
    evt.preventDefault()

    const resultArray = this.createSearchResults(this.state.searchString)
    this.props.setResults(resultArray)
  }
  createSearchResults = searchString => {
    const products = this.props.products.allProducts

    const results = products
      .filter(product =>
        product.name.toLowerCase().includes(searchString.toLowerCase())
      )
      .map(product => product.id)

    if (results.length) return results
    else return ['not found'] //need this to differentiate between an empty array which is interpreted as "we haven't yet attempted to search for results"
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Input
              icon="search"
              name="search"
              type="text"
              placeholder="Search..."
              value={this.state.searchString}
              onChange={this.handleChange}
            />
            <Button color="teal" type="submit">
              Search
            </Button>
          </div>
        </form>
      </div>
    )
  }
}
const mapState = ({products}) => ({products})
const mapDispatch = {setResults}

export default connect(mapState, mapDispatch)(Search)
