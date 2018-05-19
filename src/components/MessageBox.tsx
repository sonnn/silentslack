import { Button, Input } from 'antd';
import * as React from 'react';
const { TextArea } = Input;

export default class MessageBox extends React.Component<
  {
    sendMessage?: (
      message: { text: string; channel: string; type: string }
    ) => void;
    channelId?: string;
  },
  { message: string }
> {
  public state = {
    message: ''
  };

  public render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            borderBottom: `1px solid ${styles.fontColor}`,
            boxSizing: 'border-box',
            display: 'flex',
            flex: 1
          }}
        >
          <TextArea
            rows={2}
            style={{
              background: styles.backgroundColor,
              border: 'none',
              color: styles.fontColor,
              height: 50,
              resize: 'none'
            }}
            value={this.state.message}
            onChange={this.handleOnChange}
            onPressEnter={this.handleEnter}
          />
        </div>
        <Button
          onClick={this.handleEnter}
          style={{
            background: styles.backgroundColor,
            borderColor: styles.fontColor,
            borderRadius: 0,
            borderTop: 0,
            color: styles.fontColor,
            height: 51
          }}
        >
          PURRR
        </Button>
      </div>
    );
  }

  private handleEnter = (event: any) => {
    event.preventDefault();

    const { channelId, sendMessage } = this.props;

    if (sendMessage && channelId) {
      sendMessage({
        channel: channelId,
        text: this.state.message,
        type: 'message'
      });
    }

    this.setState({ message: '' });
  };

  private handleOnChange = (event: any) => {
    this.setState({ message: event.target.value });
  };
}

const styles = {
  backgroundColor: '#000',
  fontColor: '#00c200'
};
