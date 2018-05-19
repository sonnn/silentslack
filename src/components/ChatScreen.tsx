import { Layout } from 'antd';
import * as React from 'react';
import ChannelContainer from '../containers/Channel';
import MessageContainer from '../containers/Message';

export default class ChatScreen extends React.Component {
  public render() {
    return (
      <Layout style={{ height: '100%' }}>
        <ChannelContainer />
        <MessageContainer />
      </Layout>
    );
  }
}
