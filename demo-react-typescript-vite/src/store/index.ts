import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global";
import auditProdSEOReduxReducer from "@swift/features/ProductAuditSEO/store";

const rootReducer = combineReducers({
  global: globalReducer,
  auditProdSEO: auditProdSEOReduxReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //   serializableCheck: {
      //     // Ignore these action types
      //     ignoredActions: ['your/action/type'],
      //     // Ignore these field paths in all actions
      //     ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      //     // Ignore these paths in the state
      //     ignoredPaths: ['items.dates'],
      //   },
      serializableCheck: false,
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
