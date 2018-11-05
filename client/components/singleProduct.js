import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Grid,
  Card,
  Divider,
  Header,
  Button,
  Icon,
  Input,
  Item
} from 'semantic-ui-react'
import {fetchOneProduct} from '../store/products'
import {addToCartThunk} from '../store/cart'

class SingleProduct extends React.Component {
  state = {
    quantity: 0
  }

  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchProduct(productId)
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  render() {
    const product = this.props.products.selectedProduct
    const {id, imageUrl, stock, price, description, name} = product
    const quantity = this.state.quantity ? this.state.quantity : 1
    return (
      <div className="ui container">
        {product.id && (
          <Item.Group>
            <Item>
              <Item.Image src={imageUrl} size="large" />
              <Item.Content>
                <Item.Header>{name}</Item.Header>
                <Item.Meta>
                  <span>{price}</span>
                </Item.Meta>
                <Item.Description verticalAlign="middle">
                  {description}
                </Item.Description>
                <Item.Extra>
                  {stock ? (
                    <Input
                      action={
                        <Button
                          onClick={() => this.props.addToCart(id, quantity)}
                        >
                          <Icon name="cart" />
                          Add to Cart
                        </Button>
                      }
                      name="quantity"
                      placeholder="quantity"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <Header>This product is currently out of stock</Header>
                  )}
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({products}) => ({products})

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => {
      dispatch(fetchOneProduct(productId))
    },
    addToCart: (productId, quantity) =>
      dispatch(addToCartThunk(productId, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
