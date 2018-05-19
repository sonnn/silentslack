import * as React from 'react';
import { connect } from 'react-redux';
import { onMessageReceive } from '../redux/actions';
import slack from '../slack';

interface IDispatch {
  onMessageReceive: (data: any) => void;
}

export const SlackContext = React.createContext<{
  conn?: any;
  ws?: WebSocket;
  sendMessage: (message: any) => void;
}>({ sendMessage: message => ({}) });

class RTMContainer extends React.PureComponent<
  IDispatch,
  { conn: any; ws: any }
> {
  public static Consumer = SlackContext.Consumer;

  public state = {
    conn: undefined,
    ws: undefined
  };

  public componentDidMount() {
    this.connect();
  }

  public render() {
    return (
      <SlackContext.Provider
        value={{
          conn: this.state.conn,
          sendMessage: this.sendMessage,
          ws: this.state.ws
        }}
      >
        {this.props.children}
      </SlackContext.Provider>
    );
  }

  private proxyUrl = (url: string) => {
    return process.env.REACT_APP_WS_PROXY
      ? url.replace(
          'wss://cerberus-xxxx.lb.slack-msgs.com',
          `ws://${process.env.REACT_APP_WS_PROXY}`
        )
      : url;
  };

  private async connect() {
    const conn = await slack.rtm.connect();
    const ws = new WebSocket(this.proxyUrl(conn.url));

    ws.onopen = () => console.log('socket connected!');
    ws.onerror = e => console.log('socket error!', e);
    ws.onmessage = (message: { data: string }) => {
      const data = JSON.parse(message.data);

      if (data.type === 'message') {
        this.props.onMessageReceive(data);
      }
      if ('reply_to' in data && data.text && data.ok) {
        this.props.onMessageReceive(data);
      }
    };

    this.setState({ ws, conn });
  }

  private sendMessage = (message: {
    type: string;
    channel: string;
    text: string;
  }) => {
    const { ws } = this.state;

    if (ws) {
      (ws as WebSocket).send(JSON.stringify(message));
    }
  };
}

export default connect<any, IDispatch>(null, { onMessageReceive })(
  RTMContainer
);
