import React, {Component} from 'react'
import {getAllUsers, deleteUser, updateToAdmin} from '../store/users'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {
  Header,
  Icon,
  List,
  Grid,
  Table,
  TableRow,
  Form
} from 'semantic-ui-react'
class AdminUserMgmt extends Component {
  constructor() {
    super()
    this.state = {
      promoteId: 0,
      deleteId: 0
    }
  }

  async componentDidMount() {
    await this.props.getCurrentUser()
    await this.props.fetchUsers()
  }
  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleSubmit = evt => {
    evt.preventDefault()
    // const {name, description, stock, price, imageUrl} = this.state
    // const product = {name, description, stock, price, imageUrl}
    this.props.deleteUser(this.state.deleteId)
    this.props.updateToAdmin(this.state.promoteId)

    this.setState({
      promoteId: 0,
      deleteId: 0
    })
  }
  render() {
    console.log('here', this.props)
    return (
      <div>
        {this.props.user.id && this.props.user.isAdmin ? (
          <div>
            <div>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>User Id</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.users.map(user => {
                    return (
                      <Table.Row>
                        <Table.Cell>{user.id}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </div>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <label>Promote User to Admin</label>
                <Form.Input
                  placeholder="Id of user to promote"
                  name="promoteId"
                  value={this.state.promoteId}
                  onChange={this.handleChange}
                />
                <Form.Button content="Submit" />
              </Form>
              <Form onSubmit={this.handleSubmit}>
                <label>Delete User</label>
                <Form.Input
                  placeholder="Id of User to Delete"
                  name="deleteId"
                  value={this.state.deleteId}
                  onChange={this.handleChange}
                />
                <Form.Button content="Submit" />
              </Form>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(getAllUsers()),
    getCurrentUser: () => dispatch(me()),
    deleteUser: userId => dispatch(deleteUser(userId)),
    updateToAdmin: userId => dispatch(updateToAdmin(userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminUserMgmt)
