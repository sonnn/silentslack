import { Spin } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import ChannelList from '../components/ChannelList';
import { loadChannelList, loadMessageList } from '../redux/actions';
import { IState } from '../redux/reducer';

interface IProps {
  channel: {
    data: any[];
    isLoading: boolean;
  };
  group: {
    data: any[];
    isLoading: boolean;
  };
}

interface IDispatch {
  loadChannel: () => void;
  loadMessage: (item: { id: string }) => void;
}

const ChannelContainer: React.SFC<IProps & IDispatch> = ({
  channel,
  group,
  children,
  loadMessage
}) => {
  if (channel.isLoading || group.isLoading) {
    return <Spin style={{ background: '#000' }} />;
  }
  return (
    <ChannelList
      data={[...channel.data, ...group.data]}
      loadMessageList={loadMessage}
    />
  );
};

export default compose(
  connect<IProps, IDispatch>(
    (state: IState) => ({ channel: state.channel, group: state.groups }),
    {
      loadChannel: () => loadChannelList.request(),
      loadMessage: item => loadMessageList.request(item)
    }
  ),
  lifecycle<IProps & IDispatch, {}>({
    componentDidMount() {
      this.props.loadChannel();
    }
  })
)(ChannelContainer);
