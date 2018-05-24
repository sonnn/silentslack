import { Layout, List } from 'antd';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PixelImage from './PixelImage';

export default class MessageList extends React.Component<
  {
    data: any[];
    users: { [key: string]: any };
  },
  { userImages: { [key: string]: any } }
> {
  public state = {
    userImages: {}
  };
  private element: any = null;
  private activeScrollTop: boolean = true;

  public componentDidMount() {
    this.element = findDOMNode(this);
    (this.element as any).addEventListener('scroll', this.onScroll);
  }

  public componentWillUnmount() {
    this.element.removeEventListener('scroll', this.onScroll);
  }

  public componentDidUpdate() {
    this.updateScrollToBottom();
  }

  public render() {
    return (
      <Layout.Content
        style={{
          background: styles.backgroundColor,
          color: styles.fontColor,
          flex: 1,
          overflowY: 'scroll'
        }}
      >
        <List
          size="small"
          bordered={false}
          dataSource={this.props.data}
          renderItem={this.renderListItem}
        />
      </Layout.Content>
    );
  }

  private getUserName = (item: any) => {
    if (this.props.users) {
      if (this.props.users[item.user] && this.props.users[item.user].profile) {
        return (
          this.props.users[item.user].profile.display_name ||
          this.props.users[item.user].profile.real_name
        );
      }
    }
    return item.user || item.username;
  };

  private getUserAvatar = (item: any) => {
    if (this.props.users) {
      const profile = this.props.users[item.user];
      if (profile && profile.profile) {
        return <PixelImage key={item.user} src={profile.profile.image_48} />;
      }
    }
    return null;
  };

  private renderListItem = (item: {
    text: string;
    type: string;
    user: string;
  }) => {
    return (
      <List.Item
        style={{
          border: 'none',
          borderBottom: `1px solid ${styles.fontColor}`,
          color: styles.fontColor,
          paddingLeft: 10,
          textAlign: 'left'
        }}
      >
        <List.Item.Meta
          style={{ color: styles.fontColor }}
          avatar={this.getUserAvatar(item)}
          title={`${this.getUserName(item)}:`}
          description={item.text}
        />
      </List.Item>
    );
  };

  private updateScrollToBottom = () => {
    if (this.activeScrollTop) {
      if (this.element.scrollHeight > this.element.offsetHeight) {
        const diff = this.element.scrollHeight - this.element.offsetHeight;
        this.element.scrollTop = diff;
      }
    }
  };

  private onScroll = () => {
    if (this.element) {
      const diff = this.element.scrollHeight - this.element.offsetHeight;

      if (this.element.scrollTop >= diff) {
        this.activeScrollTop = true;
      } else {
        this.activeScrollTop = false;
      }
    }
  };
}

const styles = {
  backgroundColor: '#000',
  fontColor: '#00c200'
};
