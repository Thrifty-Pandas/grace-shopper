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
    const state = store.getState()

    const results = state.products.allProducts.filter(product => {
      if (product.name.toLowerCase() === searchString.toLowerCase()) {
        return product.id
      }
    })

    return results
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
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    setResults: resultArray => dispatch(setResults(resultArray))
  }
}
export default connect(null, mapDispatch)(Search)
