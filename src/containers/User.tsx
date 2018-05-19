import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { IState } from '../redux/reducer';

interface IProps {
  data: any[];
}

const UserContainer: React.SFC<IProps> = ({
  data = [],
  children
}): React.ReactElement<any> => {
  return (children as (props: { users: any[] }) => any)({ users: data });
};

export default compose(connect<IProps>((state: IState) => state.users, {}))(
  UserContainer
);
