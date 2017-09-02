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
  production: {
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
  test: {
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'quizzy-backend-test'
    },
    server: {
      host: 'localhost',
      port: '3000'
    }
  }
};

export default configuration;
