import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalBody,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    discription: '',
    price: ''
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.discription]: e.target.value });
    this.setState({ [e.target.price]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      discription: this.state.discription,
      price: this.state.price
    };
    //add item via addItem action
    this.props.addItem(newItem);
    //close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem', marginTop: '1rem' }}
            onClick={this.toggle}>
            Add Item
          </Button>
        ) : (
          <Alert style={{ textAlign: 'center' }} color='success'>
            Please Login to Manage Item!
          </Alert>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  it='item'
                  placeholder='Add shopping item'
                  onChange={this.onChange}
                />
                <Label for='item'>Discription</Label>
                <Input
                  type='text'
                  name='discription'
                  it='discription'
                  placeholder='Add shopping item'
                  onChange={this.onChange}
                />
                <Label for='item'>Price</Label>
                <Input
                  type='number'
                  name='price'
                  it='price'
                  placeholder='Add shopping item'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
