var configuration = {
  development: {
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'quizzy-backend'
    },
    server: {
      host: 'localhost',
      port: '3000'
    }
  },
<<<<<<< a05728d109062b36cd2d5e65e3d96b8a6f2836a5
  test: {
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'quizzy-backend-test'
=======
  production: {
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'quizzy-backend'
>>>>>>> Add users specs, add config file
    },
    server: {
      host: 'localhost',
      port: '3000'
    }
  },
<<<<<<< a05728d109062b36cd2d5e65e3d96b8a6f2836a5
  production: {
    database: {
      host: '172.31.29.19',
      port: '27017',
      db: 'quizzy-backend'
    },
    server: {
      host: '172.31.25.108',
=======
  test: {
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'quizzy-backend-test'
    },
    server: {
      host: 'localhost',
>>>>>>> Add users specs, add config file
      port: '3000'
    }
  }
};

export default configuration;
