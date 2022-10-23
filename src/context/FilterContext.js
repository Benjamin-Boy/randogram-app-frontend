import {
  LOAD_TREKS,
  FILTER_TREKS,
  UPDATE_FILTERS,
  LOAD_USERS,
} from "../actions";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/filterReducer";

// Imports custom contexts
import { useTrekContext } from "./TrekContext";
import { useUserContext } from "./UserContext";

const initialState = {
  filteredTreks: [],
  treks: [],
  users: [],
  filters: {
    search: "",
    myTreks: false,
    treksDone: false,
    bookmarks: false,
    easy: false,
    medium: false,
    hard: false,
    duration: 0,
    minDuration: 3600,
    maxDuration: 0,
  },
};

const FilterContext = createContext();

export const useFilterContext = () => {
  return useContext(FilterContext);
};

const FilterContextProvider = ({ children }) => {
  const { treks } = useTrekContext();
  const { users } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_TREKS, payload: treks });
    dispatch({ type: LOAD_USERS, payload: users });
  }, [treks, users]);

  useEffect(() => {
    dispatch({ type: FILTER_TREKS });
  }, [treks, users, state.filters]);

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "myTreks") {
      value = e.target.checked;
    }

    if (name === "treksDone") {
      value = e.target.checked;
    }

    if (name === "bookmarks") {
      value = e.target.checked;
    }

    if (name === "easy") {
      value = e.target.checked;
    }

    if (name === "medium") {
      value = e.target.checked;
    }

    if (name === "hard") {
      value = e.target.checked;
    }

    if (name === "duration") {
      value = Number(value);
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const value = { ...state, updateFilters };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterContextProvider;
