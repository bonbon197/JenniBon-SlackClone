const DB_KEY = 'slackDB';

const getDB = () => {
  try {
      const db = localStorage.getItem(DB_KEY);
      return db ? JSON.parse(db) : {};
  } catch (error) {
      console.error('Error while parsing the database from localStorage:', error);
      return {};
  }
};

const setDB = (db: any) => {
  try {
      localStorage.setItem(DB_KEY, JSON.stringify(db));
      console.log('DB updated:', JSON.stringify(db));
  } catch (error) {
      console.error('Error while storing the database in localStorage:', error);
  }
};


export { getDB, setDB };