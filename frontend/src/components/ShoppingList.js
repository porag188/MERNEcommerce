import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { Container, ListGroup, Card, Button } from 'reactstrap';
class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            <div className='row'>
              {items.map(item => (
                <div className='col-md-4'>
                  <div className='card md-4 shadow-sm'>
                    <div className='card-body'>
                      {this.props.isAuthenticated ? (
                        <Button
                          className='remove-btn'
                          color='danger'
                          size='sm'
                          onClick={this.onDeleteClick.bind(this, item._id)}>
                          &times;
                        </Button>
                      ) : null}

                      <h4>{item.name} </h4>
                      <p>{item.discription} </p>
                      <strong>{item.price} $ </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
