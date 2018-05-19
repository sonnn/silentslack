import { ActionsUnion, getType } from 'typesafe-actions';
import * as A from './actions';

export interface IState {
  channel: {
    data: any[];
    isLoading: boolean;
  };
  message: {
    channelId: string;
    data: any[];
    isLoading: boolean;
  };
  profile: {
    data: any;
    isLoading: boolean;
  };
  users: {
    data: any[];
    isLoading: boolean;
  };
  groups: {
    data: any[];
    isLoading: boolean;
  };
  auth: {
    ok: boolean;
  };
}

const initState: IState = {
  auth: {
    ok: false
  },
  channel: {
    data: [],
    isLoading: false
  },
  groups: {
    data: [],
    isLoading: false
  },
  message: {
    channelId: '',
    data: [],
    isLoading: false
  },
  profile: {
    data: {},
    isLoading: false
  },
  users: {
    data: [],
    isLoading: false
  }
};

type Actions = ActionsUnion<typeof A>;

function reducer(state: IState = initState, action: Actions) {
  switch (action.type) {
    case getType(A.loadAuth.request):
      return { ...state, auth: { token: action.payload } };
    case getType(A.loadAuth.success):
      return { ...state, auth: { ...state.auth, ...action.payload } };
    // profile
    case getType(A.loadUserProfile.request):
      return { ...state, profile: { ...state.profile, isLoading: true } };
    case getType(A.loadUserProfile.success):
      return { ...state, profile: { data: action.payload, isLoading: false } };
    case getType(A.loadUserProfile.failure):
      return { ...state, profile: { ...state.profile, isLoading: false } };
    // groups
    case getType(A.loadGroups.request):
      return { ...state, groups: { ...state.groups, isLoading: true } };
    case getType(A.loadGroups.success):
      return { ...state, groups: { data: action.payload, isLoading: false } };
    case getType(A.loadGroups.failure):
      return { ...state, groups: { ...state.groups, isLoading: false } };
    // users
    case getType(A.loadUsers.request):
      return { ...state, users: { ...state.users, isLoading: true } };
    case getType(A.loadUsers.success):
      // optimize
      const data = action.payload.reduce(
        (acc: { [key: string]: any }, cur: { id: string }) => {
          acc[cur.id] = cur;
          return acc;
        },
        {}
      );
      return { ...state, users: { data, isLoading: false } };
    case getType(A.loadUsers.failure):
      return { ...state, users: { ...state.users, isLoading: false } };
    // channels
    case getType(A.loadChannelList.request):
      return { ...state, channel: { ...state.channel, isLoading: true } };
    case getType(A.loadChannelList.failure):
      return { ...state, channel: { ...state.channel, isLoading: false } };
    case getType(A.loadChannelList.success):
      return {
        ...state,
        channel: {
          data: action.payload.channels.filter(f => f.is_member),
          isLoading: false
        }
      };
    // messages
    case getType(A.loadMessageList.request):
      return {
        ...state,
        message: {
          ...state.message,
          isLoading: true,
          // tslint:disable-next-line
          channelId: action.payload.id
        }
      };
    case getType(A.loadMessageList.failure):
      return { ...state, message: { ...state.message, isLoading: false } };
    case getType(A.loadMessageList.success):
      return {
        ...state,
        message: {
          ...state.message,
          data: action.payload.messages.reverse(),
          isLoading: false
        }
      };
    case getType(A.onMessageReceive): {
      if (action.payload.channel === state.message.channelId) {
        return {
          ...state,
          message: {
            ...state.message,
            data: [...state.message.data, action.payload]
          }
        };
      }
      if (action.payload.ok && 'reply_to' in action.payload) {
        return {
          ...state,
          message: {
            ...state.message,
            data: [
              ...state.message.data,
              { ...action.payload, user: state.profile.data.user_id }
            ]
          }
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export default reducer;
