import _ from 'lodash'
import Sidebar from '../sidebar'
const sessionUrl = 'https://afrikka.firebaseio.com/sessions/';
const connectedUrl = 'https://afrikka.firebaseio.com/.info/connected';

class Session {
  constructor() {
    this.restoreSession();
    this.updateBackend();
  }

  // try to deserialize stored session
  // if fail then assign new id.
  // update activeAt and send session to firebase
  restoreSession() {
    this.data = {};

    try {
      _.extend(this.data, JSON.parse(localStorage.session));
    } catch (err) {
      this.data.id = randomId();
    }

    this.data.activeAt = Date.now();
    localStorage.session = JSON.stringify(this.data);
  }

  updateBackend() {
    this.sessionRef = new Firebase(sessionUrl + this.data.id);
    this.sessionsRef = new Firebase(sessionUrl);
    let connectedRef = new Firebase(connectedUrl);

    this.sessionsRef.on('value', (snap) => {
      let sessions = Object.keys(snap.val() || {});

      Sidebar.setOnlineCount(sessions.length);
    });

    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        this.sessionRef.set(this.data);

        this.sessionRef.onDisconnect().remove();
      }
    });
  }
}

function randomId () {
  let letters = 'abcdefghklmnopqrstuvwxyz_1234567890'.split('');
  let code = '';
  for (let i=0; i <= 10; i++) {
    code += letters[Math.floor(Math.random() * letters.length)]
  }

  return code + Date.now();
}

export default Session