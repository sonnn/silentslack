import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import slack, { bindToken } from '../slack';
import {
  loadAuth,
  loadChannelList,
  loadGroups,
  loadMessageList,
  loadUserProfile,
  loadUsers
} from './actions';

async function _fetchChannelList() {
  return await slack.channels.list();
}

async function _fetchChannelHistory({
  id,
  is_group
}: {
  id: string;
  is_group: boolean;
}) {
  if (is_group) {
    return await slack.groups.history({ channel: id });
  }
  return await slack.channels.history({ channel: id });
}

async function _fetchUserProfile() {
  return await slack.auth.test();
}

async function _fetchUsers() {
  return await slack.users.list();
}

async function _fetchGroups() {
  return await slack.groups.list();
}

async function _authTest(token: string) {
  return await slack.auth.test({ token });
}

function* fetchChannelList() {
  try {
    const response = yield call(_fetchChannelList);
    yield put(loadChannelList.success(response));
  } catch (e) {
    yield put(loadChannelList.failure(e));
  }
}

function* fetchMessagelList(action: any) {
  try {
    const response = yield call(_fetchChannelHistory, action.payload);
    yield put(loadMessageList.success(response));
  } catch (e) {
    yield put(loadMessageList.failure(e));
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(_fetchUserProfile);
    yield put(loadUserProfile.success(response));
  } catch (e) {
    yield put(loadUserProfile.failure(e));
  }
}

function* fetchUsers() {
  try {
    const response = yield call(_fetchUsers);
    yield put(loadUsers.success(response.members));
  } catch (e) {
    yield put(loadUsers.failure(e));
  }
}

function* fetchGroups() {
  try {
    const response = yield call(_fetchGroups);
    const groups = response.groups.filter((f: any) => !f.is_archived);
    yield put(loadGroups.success(groups));
  } catch (e) {
    yield put(loadGroups.failure(e));
  }
}

function* fetchAuth(action: any) {
  try {
    let storeAuth = localStorage.getItem('silent-slack-auth');
    
    if (storeAuth) {
      storeAuth = JSON.parse(storeAuth);
      bindToken(storeAuth.token);
      yield put(loadAuth.success(storeAuth));
    } else {
      const response = yield call(_authTest, action.payload);

      if (response.ok) {
        storeAuth = { ...response, token: action.payload };
        localStorage.setItem('silent-slack', JSON.stringify(storeAuth));
        
        bindToken(action.payload);       
        yield put(loadAuth.success(storeAuth));
      }
    }
  } catch (e) {
    yield put(loadAuth.failure(e));
  }
}

function* fetchAll() {
  yield call(fetchChannelList);
  yield call(fetchUserProfile);
  yield call(fetchUsers);
  yield call(fetchGroups);
}

export default function* saga() {
  yield all([
    yield takeEvery(getType(loadAuth.request), fetchAuth),
    yield takeEvery(getType(loadChannelList.request), fetchAll),
    yield takeEvery(getType(loadMessageList.request), fetchMessagelList),
    yield takeEvery(getType(loadUserProfile.request), fetchUserProfile)
  ]);
}
