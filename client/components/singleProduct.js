import React from 'react'
import {connect} from 'react-redux'
import {Container, Grid, Card, Divider, Image} from 'semantic-ui-react'
import {fetchOneProduct} from '../store/products'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchProduct(productId)
  }

  render() {
    const product = this.props.products.selectedProduct
    return (
      product.id && (
        <Grid columns={2} relaxed>
          <Grid.Column>
            <Card>
              <Image src={product.imageUrl} />
              <Card.Content>
                <Card.Header> Product{product.name}</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Divider vertical hidden />
          <Grid.Column>
            <Grid columns={2} relaxed>
              <Grid.Column>{product.price}</Grid.Column>
              <Grid.Column>{product.stock}</Grid.Column>
            </Grid>
            <Container>
              <p> {product.description} </p>
            </Container>
          </Grid.Column>
        </Grid>
      )
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
