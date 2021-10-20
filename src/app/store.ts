import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mapContainerReducer from '../features/map-container/mapContainerSlice';

export const store = configureStore({
  reducer: {
    mapContainer: mapContainerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
