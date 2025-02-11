import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
