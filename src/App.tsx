import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import ChatScreen from './components/ChatScreen';
import GuardScreen from './components/GuardScreen';
import RTMContainer from './containers/RTM';
import { loadAuth } from './redux/actions';
import { IState } from './redux/reducer';

interface IProps {
  auth: { ok: boolean };
}

interface IDispatch {
  authentication: (token: string) => void;
}

class App extends React.Component<IProps & IDispatch> {
  public render() {
    return (
      <div className="App">
        {!this.props.auth.ok ? (
          <GuardScreen authentication={this.props.authentication} />
        ) : (
          <RTMContainer>
            <ChatScreen />
          </RTMContainer>
        )}
      </div>
    );
  }
}

export default connect<IProps, IDispatch>(
  (state: IState) => ({
    auth: state.auth
  }),
  {
    authentication: (token: string) => loadAuth.request(token)
  }
)(App);
