import { Layout, List } from 'antd';
import * as React from 'react';

export default class ChannelList extends React.Component<{
  data: any[];
  loadMessageList: (item: { id: string }) => void;
}> {
  public render() {
    return (
      <Layout.Sider
        style={{
          background: styles.backgroundColor,
          borderRight: `1px solid ${styles.fontColor}`
        }}
      >
        <div style={{ overflowY: 'scroll', height: '100%' }}>
          <List
            size="small"
            bordered={false}
            dataSource={this.props.data}
            renderItem={this.renderListItem}
          />
        </div>
      </Layout.Sider>
    );
  }

  private loadMessageList = (item: any) => {
    this.props.loadMessageList(item);
  };

  private renderListItem = (item: any) => {
    return (
      <List.Item
        key={item.id}
        style={{
          border: 'none',
          borderBottom: `1px solid ${styles.fontColor}`,
          color: styles.fontColor,
          paddingLeft: 10,
          textAlign: 'left'
        }}
      >
        <div onClick={this.loadMessageList.bind(this, item)}>{`#${
          item.name
        }`}</div>
      </List.Item>
    );
  };
}

const styles = {
  backgroundColor: '#000',
  fontColor: '#00c200'
};
