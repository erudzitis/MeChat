// Imports
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ReducerState, TypedDispatch } from "../reducers";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReducerState> = useSelector;