'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
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
  ToggleEditMode = 'TOGGLE_EDIT_MODE',
  SortColors = 'SORT_COLORS',
  RemoveColor = 'REMOVE_COLOR',
  AddNewColor = 'ADD_NEW_COLOR',
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT',
  MergeLocalStorageState = 'MERGE_LOCAL_STORAGE_STATE',
  SaveTrip = 'SAVE_TRIP',
  LoadTrip = 'LOAD_TRIP',
}

interface Payloads {
  [ActionType.ToggleEditMode]: never;
  [ActionType.SortColors]: never;
  [ActionType.RemoveColor]: string;
  [ActionType.AddNewColor]: string;
  [ActionType.Increment]: string;
  [ActionType.Decrement]: string;
  [ActionType.MergeLocalStorageState]: State;
  [ActionType.SaveTrip]: never;
}
export type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
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
      const newColors = state.colors.filter(
        (color) => color.id !== action.payload,
      );
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
      };
      return {
        ...state,
        isLoading: true,
        trips: [newTrip, ...state.trips],
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
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    'colors',
    DEFAULT_STATE,
  );

  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  useEffect(() => {
    setLocalStorageState(state);
  }, [state]);

  useEffect(() => {
    dispatch({
      payload: localStorageState,
      type: ActionType.MergeLocalStorageState,
    });
  }, []);

  return (
    <AppContext.Provider value={{ dispatch, state: localStorageState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const { dispatch, state } = useContext(AppContext);

  return { dispatch, state };
};
