import { combineReducers, createStore } from "redux";
import { game } from "./modules/game";

export type ReduxState = ReturnType<typeof store.getState>;

export const store = createStore(
  combineReducers({
    game
  }),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
