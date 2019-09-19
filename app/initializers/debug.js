export function initialize(application) {
  application.inject('controller', 'debug', 'service:debug');
}

export default {
  initialize
};
