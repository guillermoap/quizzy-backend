import answerQuestionServer from '../../config/routes/ws';
import locks from 'locks';

let store = new Map();

const info_mutex = locks.createMutex();

// States
const WAITING_STATE = 0;
const ANSWERING_STATE = 1;
const ANSWERED_STATE = 2;

// Client Actions
const READY_ACTION = 0;
const ANSWERED_ACTION = 1;
const TIMEOUT_ACTION = 2;

// Signals sent by server
const START_SIGNAL = 0;


export const answer_question_controller = (ws, req) => {

  //broadcast
  ws.broadcast = msg => {
    answerQuestionServer.clients.forEach(client => {
      client.send(msg);
    });
  };

  ws.on('message', (msg) => {
    info_mutex.lock(() => {
      const action = JSON.parse(msg);
      let state  = store.get(action.url);
      if (!state ) {
        state  = {
          url: action.url,
          status: WAITING_STATE,
          players: [],
          totalPlayers: action.totalPlayers,
          ranking: [],
          winner: null
          match:
        };
        store.set(action.url, state );
      }

      switch (state.status) {
        case WAITING_STATE:
          if (action.type === READY_ACTION) {
            state = {
              ...state,
              players: state.players.concat([ action.player ])
              ranking: state.ranking.concat([ 0 ])
            };
            if (state.players.length >= state.players.totalPlayers) {
              state.status = ANSWERING_STATE;
            }
            store.set(state.url, state);
            answerQuestionServer.broadcast({ type: START_SIGNAL, players: state.players });
          }
          return;
        case ANSWERING_STATE:
          switch (action.type) {
            case ANSWERED_ACTION:
              state = {
                ...state,

              };
          }
          return;
        case ANSWERED_STATE:
          return;
      }
    });
  });
}
