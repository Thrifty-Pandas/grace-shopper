import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Grid,
  Card,
  Divider,
  Button,
  Icon,
  Item
} from 'semantic-ui-react'
import {fetchOneProduct} from '../store/products'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchProduct(productId)
  }

  render() {
    const product = this.props.products.selectedProduct
    const {id, imageUrl, stock, price, description, name} = product
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
                  <Button>
                    <Icon name="cart" />
                    Add to Cart
                  </Button>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
