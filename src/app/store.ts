import { combineReducers, configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/slices/transactionSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
    transactions: transactionsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;