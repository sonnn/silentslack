import { Layout, Spin } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import MessageBox from '../components/MessageBox';
import MessageList from '../components/MessageList';
import { IState } from '../redux/reducer';
import { SlackContext } from './RTM';
import UserContainer from './User';

interface IProps {
  data: any[];
  isLoading: boolean;
  channelId: string;
}

const MessageContainer: React.SFC<IProps> = ({
  data,
  isLoading,
  channelId
}) => {
  return (
    <SlackContext.Consumer>
      {({ sendMessage }) => (
        <UserContainer>
          {({ users }: { users: { [key: string]: any } }) => (
            <Layout
              style={{ background: styles.backgroundColor, paddingBottom: 15 }}
            >
              {isLoading ? (
                <Spin style={{ height: '100%', background: '#000' }} />
              ) : (
                <MessageList data={data} users={users} />
              )}
              <Layout.Footer
                style={{
                  background: styles.backgroundColor,
                  borderTop: `1px solid ${styles.fontColor}`,
                  padding: 0
                }}
              >
                <MessageBox sendMessage={sendMessage} channelId={channelId} />
              </Layout.Footer>
            </Layout>
          )}
        </UserContainer>
      )}
    </SlackContext.Consumer>
  );
};

export default compose(
  connect<IProps>((state: IState) => state.message, {}),
  lifecycle<IProps, {}>({})
)(MessageContainer);

const styles = {
  backgroundColor: '#000',
  fontColor: '#00c200'
};
