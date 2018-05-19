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
          value="xoxp-198937974935-198114619794-204097379584-5571bf56db6165da9b0f7b3185eba241"
        />
      </Layout>
    );
  }

  private submit = (token: string) => {
    this.props.authentication(token);
  };
}
