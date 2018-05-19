import { createAction, createAsyncAction } from 'typesafe-actions';

export const loadChannelList = createAsyncAction(
  'LOAD_CHANNEL_LIST',
  'LOAD_CHANNEL_LIST_SUCCESS',
  'LOAD_CHANNEL_LIST_FAILURE'
)<void, { channels: any[]; ok: boolean }, {}>();

export const loadMessageList = createAsyncAction(
  'LOAD_MESSAGE_LIST',
  'LOAD_MESSAGE_LIST_SUCCESS',
  'LOAD_MESSAGE_LIST_FAILURE'
)<{ id: string }, { messages: any[]; ok: boolean }, {}>();

export const loadUserProfile = createAsyncAction(
  'LOAD_USER_PROFILE',
  'LOAD_USER_PROFILE_SUCCESS',
  'LOAD_USER_PROFILE_FAILURE'
)<void, { [key: string]: any }, {}>();

export const loadUsers = createAsyncAction(
  'LOAD_USERS',
  'LOAD_USERS_SUCCESS',
  'LOAD_USERS_FAILURE'
)<void, { [key: string]: any }, {}>();

export const loadGroups = createAsyncAction(
  'LOAD_GROUPS',
  'LOAD_GROUPS_SUCCESS',
  'LOAD_GROUPS_FAILURE'
)<void, { [key: string]: any }, {}>();

export const loadAuth = createAsyncAction(
  'LOAD_AUTH',
  'LOAD_AUTH_SUCCESS',
  'LOAD_AUTH_FAILURE'
)<string, { ok: boolean }, {}>();

export const onMessageReceive = createAction(
  'ON_MESSAGE_RECEIVE',
  cb => (payload: {
    channel: string;
    user: string;
    text: string;
    type: string;
    ok?: boolean;
    reply_to?: number;
  }) => {
    return cb(payload);
  }
);

export const sendMessage = createAction(
  'SEND_MESSAGE',
  cb => (payload: { message: string }) => {
    return cb(payload);
  }
);
