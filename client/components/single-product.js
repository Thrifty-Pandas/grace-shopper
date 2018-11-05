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
import {ProductReviews, ReviewForm} from './index'
import {
  getProductsInCartThunk,
  addToCartThunk,
  editProductInCart
} from '../store/cart'

class SingleProduct extends React.Component {
  state = {
    quantity: 1
  }

  async componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    await this.props.fetchProduct(productId)
    this.props.getProductsInCart()
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  render() {
    const product = this.props.products.selectedProduct
    const {id, imageUrl, stock, price, description, name} = product
    const quantity = this.state.quantity ? this.state.quantity : 1
    return (
      <Container>
        {product.id && (
          <Item.Group>
            <Item>
              <Item.Image src={imageUrl} size="large" />
              <Item.Content>
                <Item.Header>{name}</Item.Header>
                <Item.Meta>
                  <span>${price}</span>
                  <br />
                  <span> {stock} in stock </span>
                </Item.Meta>
                <Item.Description verticalalign="middle">
                  {description}
                </Item.Description>
                <Item.Extra>
                  <Input
                    action={
                      <Button
                        onClick={() => {
                          if (
                            this.props.cart.findIndex(
                              obj => obj.productId === id
                            ) === -1
                          ) {
                            this.props.addToCart(id, quantity)
                          } else {
                            this.props.editProductInCart(id, quantity)
                          }
                        }}
                      >
                        <Icon name="cart" />
                        Add to Cart
                      </Button>
                    }
                    type="number"
                    name="quantity"
                    placeholder="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        )}
        <ProductReviews />
        <ReviewForm />
      </Container>
    )
  }
}

const mapStateToProps = state => ({products: state.products, cart: state.cart})

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => {
      dispatch(fetchOneProduct(productId))
    },
    addToCart: (productId, quantity) =>
      dispatch(addToCartThunk(productId, quantity)),
    editProductInCart: (productId, quantity) => {
      dispatch(editProductInCart(productId, quantity))
    },
    getProductsInCart: () => {
      dispatch(getProductsInCartThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
