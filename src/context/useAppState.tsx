'use client';

import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import { DEFAULT_COLORS } from '~/constants';
import { type Trip } from '~/types';
import { useLocalStorage } from '~/util/useLocalStorage';

const DEFAULT_STATE = {
  colors: DEFAULT_COLORS,
  isEditMode: false,
  isLoading: true,
  trips: [] as Trip[],
};

export type State = typeof DEFAULT_STATE;

export enum ActionType {
  AddNewColor = 'ADD_NEW_COLOR',
  Decrement = 'DECREMENT',
  Increment = 'INCREMENT',
  LoadTrip = 'LOAD_TRIP',
  MergeLocalStorageState = 'MERGE_LOCAL_STORAGE_STATE',
  RemoveColor = 'REMOVE_COLOR',
  SaveTrip = 'SAVE_TRIP',
  SortColors = 'SORT_COLORS',
  ToggleEditMode = 'TOGGLE_EDIT_MODE',
}

interface Payloads {
  [ActionType.ToggleEditMode]: never;
  [ActionType.SortColors]: never;
  [ActionType.RemoveColor]: string;
  [ActionType.AddNewColor]: string;
  [ActionType.Increment]: string;
  [ActionType.Decrement]: string;
  [ActionType.MergeLocalStorageState]: State;
  [ActionType.SaveTrip]: string;
  [ActionType.LoadTrip]: Trip;
}
export type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        payload: M[Key];
        type: Key;
      };
};

type Actions = ActionMap<Payloads>[keyof ActionMap<Payloads>];

const reducer = (state: typeof DEFAULT_STATE, action: Actions) => {
  switch (action.type) {
    case ActionType.ToggleEditMode: {
      return {
        ...state,
        isEditMode: !state.isEditMode,
      };
    }
    case ActionType.SortColors: {
      const sortedColors = [...state.colors].sort((a, b) => b.count - a.count);
      return {
        ...state,
        colors: sortedColors,
      };
    }
    case ActionType.RemoveColor: {
      const newColors = state.colors.filter((color) => color.id !== action.payload);
      return {
        ...state,
        colors: newColors,
      };
    }
    case ActionType.AddNewColor: {
      const newColors = [
        ...state.colors,
        {
          count: 0,
          hex: action.payload,
          id: Math.random().toString(),
        },
      ];
      return {
        ...state,
        colors: newColors,
      };
    }
    case ActionType.Increment: {
      const newColors = state.colors.map((color) => {
        if (color.id === action.payload) {
          return {
            ...color,
            count: color.count + 1,
          };
        }
        return color;
      });
      return {
        ...state,
        colors: newColors,
      };
    }
    case ActionType.Decrement: {
      const newColors = state.colors.map((color) => {
        if (color.id === action.payload) {
          return {
            ...color,
            count: color.count - 1,
          };
        }
        return color;
      });
      return {
        ...state,
        colors: newColors,
      };
    }
    case ActionType.SaveTrip: {
      const newTrip = {
        colors: state.colors,
        created: new Date().toISOString(),
        id: Math.random().toString(),
        lastUpdated: new Date().toISOString(),
        name: action.payload,
      };
      return {
        ...state,
        trips: [newTrip, ...state.trips],
      };
    }
    case ActionType.LoadTrip: {
      return {
        ...state,
        colors: action.payload.colors,
        isLoading: false,
      };
    }
    case ActionType.MergeLocalStorageState: {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

const AppContext = createContext<{
  dispatch: React.Dispatch<Actions>;
  state: State;
}>({
  dispatch: () => null,
  state: DEFAULT_STATE,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [localStorageState, setLocalStorageState] = useLocalStorage('colors', DEFAULT_STATE);

  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  useEffect(() => {
    setLocalStorageState(state);
  }, [state, setLocalStorageState]);

  useEffect(() => {
    dispatch({
      payload: localStorageState,
      type: ActionType.MergeLocalStorageState,
    });
  }, [dispatch]);

  return <AppContext.Provider value={{ dispatch, state: localStorageState }}>{children}</AppContext.Provider>;
};

export const useAppState = () => {
  const { dispatch, state } = useContext(AppContext);

  return { dispatch, state };
};
