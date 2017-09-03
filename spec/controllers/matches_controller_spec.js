import chai, { expect, request } from 'chai';
import chaiHttp from 'chai-http';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import User from '../../app/models/user';
import Match from '../../app/models/match';

chai.use(chaiHttp);

describe('MatchesController', () => {
    var match;
    var match2;
  
    beforeEach(function(done){
      factory.createMany('match', 2, [{}])
        .then(matchArray => {
          match = matchArray[0];
          match2 = matchArray[1];
          done();
        })
    });
  
    afterEach(function(done){
      Match.remove({}, function() {
        done();
      });
    });

    describe('index', () => {
        it('returns 200', (done) => {
          request(app).get('/matches')
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    
        it('returns the right json object', (done) => {
          request(app).get('/matches')
            .end((err, res) => {
              expect(res.body.matches[0]).to.have.keys(
                'id',
                'isRealTime',
                'players', 
                'owner',
                'endingDate',
                'game',
                'result');
              done();
            });
        });
      });
});

