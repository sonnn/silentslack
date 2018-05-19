/* tslint:disable */
const Slack = require('slack');
const bind = require('slack/src/_bind');
const exec = require('slack/src/_exec');

const slack = new Slack();

export default slack;

export function bindToken(token: any) {
  bind(slack, function(method: any, params = { token }, callback: any) {
    params.token = (params && params.token) || token;
    return exec(method, params, callback);
  });
}
