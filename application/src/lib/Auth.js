import storage from './Storage';

class Auth {

  constructor(storage) {
    this.storage = storage;
  }

  async saveSession(authToken, authExpiration, authExpires, userId, username) {
    await this.storage.set('authToken', authToken);
    await this.storage.set('authExpiration', authExpiration);
    await this.storage.set('authExpires', authExpires);
    await this.storage.set('userId', userId);
    await this.storage.set('username', username);
  }

  async getSession() {
    return {
      authToken: await this.storage.get('authToken'),
      authExpiration: await this.storage.get('authExpiration'),
      authExpires: await this.storage.get('authExpires'),
      userId: await this.storage.get('userId'),
      username: await this.storage.get('username')
    }
  }

  async deleteSession() {
    await this.storage.remove('authToken');
    await this.storage.remove('userId');
    await this.storage.remove('username');
    await this.storage.remove('authExpiration');
    await this.storage.remove('authExpires');
  }

  isAuthTokenValid(authToken, authExpires) {
    const output = authToken && authExpires && parseInt(authExpires) - 60 > Math.round(new Date().getTime()/1000);
    return output;
  }
}

const auth = new Auth(storage);
export default auth;
