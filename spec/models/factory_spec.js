/*import chai, {
  expect
} from 'chai';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import Game from '../../app/models/game';
import Match from '../../app/models/match';
import User from '../../app/models/user';


describe('Factory', () => {
  var users;
  var games;
  var matches;

  factory.attrsMany('user', 1000)
  .then(userAttrsArray => {
    users = userAttrsArray;
  });

  factory.attrsMany('game', 1000)
  .then(gameAttrsArray => {
    games = gameAttrsArray;
  });

  factory.attrsMany('match', 1000)
  .then(matchAttrsArray => {
    matches = matchAttrsArray;
  });

  describe('Users', () => {
    var i;
    var j; 
    
    it('Valid nickname', (done) => {
      for (i = 0; i < 1000; i++) {
        expect(users[i].nickname).to.match(/^(\w|-)+$/);
      };
      done();
    });

    it('Unique nickname', (done) => {
      for (i = 0; i < 1000; i++) {
        var nick = users[i].nickname;
        var j = i + 1;
        while (j < 1000) {
          expect(nick).to.not.eq(users[j].nickname);
          j++;
        };
      };
      done();
    });

    it('Valid email', (done) => {
      for (i = 0; i < 1000; i++) {
        expect(users[i].email).to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);
      };
      done();
    });

    it('Unique email', (done) => {
      for (i = 0; i < 1000; i++) {
        var email = users[i].email;
        var j = i + 1;
        while (j < 1000) {
          expect(email).to.not.eq(users[j].email);
          j++;
        };
      };
      done();
    });

    it('Valid password', (done) => {
      for (i = 0; i < 1000; i++) {
        expect(users[i].password).to.match(/^\S+$/);
      };
      done();
    });
  });

  describe('Games', () => {
    var i;
    var j; 
    
    it('Valid name', (done) => {
      for (i = 0; i < 1000; i++) {
        expect(games[i].name).to.match(/^(\w|-|\s)+$/);
      };
      done();
    });
    
    it('Unique name', (done) => {
      for (i = 0; i < 1000; i++) {
        var name = games[i].name;
        var j = i + 1;
        while (j < 1000) {
          expect(name).to.not.eq(games[j].name);
          j++;
        };
      };
      done();
    });
  });

  describe('Matches', () => {
    var i;
    var j; 
    
    it('Valid url', (done) => {
      for (i = 0; i < 1000; i++) {
        expect(matches[i].url).to.match(/^(\w|-)+$/);
      };
      done();
    });

    it('Unique url', (done) => {
      for (i = 0; i < 1000; i++) {
        var url = matches[i].url;
        var j = i + 1;
        while (j < 1000) {
          expect(url).to.not.eq(matches[j].url);
          j++;
        };
      };
      done();
    });
  });
});*/