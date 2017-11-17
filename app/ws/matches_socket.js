import locks from 'locks';

let store = new Map();

const info_mutex = locks.createMutex();

// States
const WAITING_STATE = 0;
const ANSWERING_STATE = 1;
const ANSWERED_STATE = 2;
const FINISHED_STATE = 3;

// Client Actions
const READY_ACTION = 0;
const ANSWERED_ACTION = 1;
const TIMEOUT_ACTION = 2;
const NEXT_ACTION = 3;
const END_MATCH_ACTION = 4;

// Signals sent by server
const START_SIGNAL = 0;
const ANSWERED_SIGNAL = 1;
const NEXT_SIGNAL = 2;
const END_MATCH_SIGNAL = 3;

export const ANSWER_QUESTION = '/answer-question/real-time';

export const answerQuestionController = (ws, req) => {

  //broadcast
  // TODO: Change to multicast
  ws.broadcast = msg => {
    answerQuestionServer.clients.forEach(client => {
      client.send(msg);
    });
  };

  ws.on('message', (msg) => {
    info_mutex.lock(() => {
      const action = JSON.parse(msg);
      let state  = store.get(action.url);
      if (!state) {
        state  = {
          url: action.url,
          status: WAITING_STATE,
          players: [],
          totalPlayers: action.totalPlayers,
          ranking: [],
          winner: null,
          answered: 0,
          correctAnswer: action.correctAnswer,
          ws: []
        };
        store.set(action.url, state );
      }

      switch (state.status) {
        case WAITING_STATE:
          if (action.type === READY_ACTION) {
            state = {
              ...state,
              players: state.players.concat([ action.player ]),
              ranking: state.ranking.concat([ 0 ])
            };
            if (state.players.length >= state.players.totalPlayers) {
              state.status = ANSWERING_STATE;
            }
            store.set(state.url, state);
            ws.broadcast(JSON.stringify({ type: START_SIGNAL, players: state.players }));
          }
          return;
        case ANSWERING_STATE:
          switch (action.type) {
            case ANSWERED_ACTION:
              if (!state.winner && action.answer === state.correctAnswer) {
                state = {
                  ...state,
                  winner: action.player,
                  answered: state.answered + 1,
                  ranking: state.ranking.map( item => {
                    if(item.user === action.player) {
                      return {
                        user: action.player,
                        points:  item.points + 1000 // TODO: change later for something more elaborated
                      }
                    }
                  })
                };
              }
              if (state.answered >= state.players.length) {
                state.status = ANSWERED_STATE;
                ws.broadcast(JSON.stringify({ type: ANSWERED_SIGNAL, winner: state.winner }));
              }
            break;
            case TIMEOUT_ACTION:
              state = {
                ...state,
                status: ANSWERED_STATE
              };
              ws.broadcast(JSON.stringify({ type: ANSWERED_SIGNAL, winner: state.winner }));
              break;
          }
          store.set(state.url, state);
          return;
        case ANSWERED_STATE:
          switch (action.type) {
            case NEXT_ACTION:
              state = {
                status: ANSWERING_STATE,
                winner: null,
                answered: 0,
                correctAnswer: action.correctAnswer

              };
              ws.broadcast(JSON.stringify({ type: NEXT_SIGNAL }));
              break;
            case END_MATCH_ACTION:
              state = {
                ...state,
                status: FINISHED_STATE,
              };
              ws.broadcast(JSON.stringify({ type: END_MATCH_SIGNAL, ranking: state.ranking }));
              // persist!!!!
              break;
          }
          store.set(state.url, state);
          return;
      }
    });
  });
}
