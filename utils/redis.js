import { createClient } from "redis"
import { promisify } from 'util';

class RedisClient{
  constructor() {
    this.client = createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {

    });

  }

    /**
    * 
    */
    isAlive() {
      return this.client.connected;
  }

    /**
     * 
     * @param {*} key 
     * @returns 
     */
    async get(key) {
      value = await this.getAsync(key)
      return value
  }

    /**
     * 
     * @param {*} key 
     * @param {*} value 
     * @param {*} time 
     */
    async set(key, value, time) {
      this.client.setEx(key, value, time);
  }

    /**
     * 
     * @param {*} key 
     */
    async del(key) {
      this.client.del(key)
  }
}

const RedisClient = new RedisClient();

export default RedisClient;
