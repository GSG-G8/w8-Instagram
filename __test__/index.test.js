const connection = require('../server/database/config/connection');
const { dbBuild, dbBuildFakeData } = require('../server/database/config/build');
const getUsers = require('../server/database/query/users/getUser');
const addUsers = require('../server/database/query/users/addUser');
const getPosts = require('../server/database/query/posts/getPosts');
const addPosts = require('../server/database/query/posts/addPosts');

beforeAll(() => {
  return dbBuild().then(dbBuildFakeData);
});
afterAll(() => {
  return connection.end();
});


test('test get user name', () => {
  const email = 'moh@gmail.com';
  return getUsers(email).then((res) => {
    const actual = res.rows[0];
    const expected = 'Mohammed';
    expect(actual.name).toEqual(expected);
  });
});


test('test get posts', () => {
  return getPosts().then((res) => {
    const actual = res.rows[0];
    const expected = 'first post';
    expect(actual.title).toEqual(expected);
  });
});

test('test add user', () => {
  const data = { name: 'Ahmad', email: 'ahmad@gmail.com', password: '111111111' };
  return addUsers(data).then((res) => {
    const actual = res.rows[0];
    const expected = 'Ahmad';
    expect(actual.name).toEqual(expected);
  });
});

test('test add posts', () => {
  const data = { title: 'testing data', image: 'https://www.bigstockphoto.com/images/homepage/module-6.jpg', details: 'image', user_id: '5' };
  return addPosts(data).then((res) => {
    const actual = res.rows[0];
    console.log(actual);
    const expected = 'testing data';
    expect(actual.title).toEqual(expected);
  });
});