import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from './store/auth';
import * as boardActions from './store/board';
import { bindActionCreators } from 'redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.isLogin ? (
          <div>
            <h1>hello world!</h1>
            <div>{this.props.name}</div>
            <div>{this.props.age}</div>
            <div></div>
          </div>
        ) : (
          <div>
            {this.props.isLoginFetching ? (
              <div>Loading...</div>
            ) : (
              <div>
                <h1>you are a guest</h1>
                <button
                  onClick={() => {
                    this.props.AuthActions.login();
                  }}
                >
                  login
                </button>
              </div>
            )}
          </div>
        )}
        {this.props.boards ? (
          <div>
            {this.props.boards.map((board, i) => {
              return (
                <div key={i}>
                  <div>{board.title}</div>
                  <div>{board.id}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                this.props.BoardActions.getBoard();
              }}
            >
              get board
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    isLogin: state.auth.isLogin,
    isLoginFetching: state.auth.isLoginFetching,
    name: state.auth.name,
    age: state.auth.age,
    boards: state.board.boards,
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BoardActions: bindActionCreators(boardActions, dispatch),
  }),
)(App);
