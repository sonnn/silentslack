import { Icon, Input, Layout } from 'antd';
import * as React from 'react';

export default class GuardScreen extends React.Component<{
  authentication: (token: string) => void;
}> {
  public render() {
    return (
      <Layout
        style={{
          alignItems: 'center',
          background: '#000',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Input.Search
          style={{ width: '60%' }}
          enterButton={<Icon type="unlock" />}
          size="large"
          onSearch={this.submit}
        />
      </Layout>
    );
  }

  private submit = (token: string) => {
    this.props.authentication(token);
  };
}
