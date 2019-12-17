import AsyncStorage from '@react-native-community/async-storage';

class Storage {

  constructor() {
    this.store = AsyncStorage;
  }

  async get(key, def=null) {
     const item = await this.store.getItem(key)
     return item ? JSON.parse(item) : def;
  }

  async set(key, data) {
    data = typeof data === 'undefined' ? null : data;
    await this.store.setItem(key, JSON.stringify(data));
  }

  async remove(key) {
    await this.store.removeItem(key);
  }

  async clear() {
    await this.store.clear();
  }
}

const storage = new Storage();
export default storage;
