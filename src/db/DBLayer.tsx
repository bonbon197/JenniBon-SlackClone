const DB_KEY = 'slackDB';

const getDB = () => {
  const db = localStorage.getItem(DB_KEY);
  if (db) {
    return JSON.parse(db);
  }
  return {};
};

const setDB = (db: any) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  console.log("DB updated" + JSON.stringify(db));
};

export { getDB, setDB };