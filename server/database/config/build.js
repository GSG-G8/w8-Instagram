const { readFileSync } = require('fs');
const { join } = require('path');

const connection = require('./connection');

const dbBuild = () => {
  const sql = readFileSync(join(__dirname, 'build.sql')).toString();
  return connection.query(sql);
};

const dbBuildFakeData = () => {
  const sql = readFileSync(join(__dirname, 'fakeData.sql')).toString();
  return connection.query(sql);
};

module.exports = { dbBuild, dbBuildFakeData };
