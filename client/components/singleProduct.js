import React from 'react'
import {connect} from 'react-redux'
import {Container, Grid, Card, Divider} from 'semantic-ui-react'
import {fetchOneProduct} from '../store/products'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchOneProduct(productId)
  }

  render() {
    const product = this.props.oneProduct
    return (
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
  }
}

const mapStateToProps = state => {
  return {
    oneProduct: state.oneProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOneProduct: productId => {
      dispatch(fetchOneProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
