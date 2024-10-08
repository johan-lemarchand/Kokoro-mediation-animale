class MockRedis {
    private store: { [key: string]: string } = {};
  
    async get(key: string): Promise<string | null> {
      return this.store[key] || null;
    }
  
    async set(key: string, value: string, options?: { ex?: number }): Promise<void> {
      this.store[key] = value;
    }
  }
  
  export const mockRedis = new MockRedis();