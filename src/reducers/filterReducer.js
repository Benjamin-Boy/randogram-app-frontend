import {
  LOAD_TREKS,
  FILTER_TREKS,
  UPDATE_FILTERS,
  LOAD_USERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_TREKS) {
    let maxDuration = action.payload.map((trek) => trek.duration);
    maxDuration = Math.max(...maxDuration);

    return {
      ...state,
      treks: [...action.payload],
      filteredTreks: [...action.payload],
      filters: {
        ...state.filters,
        maxDuration: maxDuration,
        duration: maxDuration,
      },
    };
  }

  if (action.type === LOAD_USERS) {
    return {
      ...state,
      users: [...action.payload],
      filters: {
        ...state.filters,
      },
    };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_TREKS) {
    const { treks, users } = state;
    const {
      search,
      myTreks,
      treksDone,
      bookmarks,
      easy,
      medium,
      hard,
      duration,
      minDuration,
      maxDuration,
    } = state.filters;

    const user = users.find(
      (user) => user.id === parseInt(localStorage.getItem("id"))
    );

    let tempTreks = [...treks];

    // Search
    if (search) {
      tempTreks = tempTreks.filter((trek) => {
        return trek.attributes.name
          .toLowerCase()
          .startsWith(search.toLowerCase());
      });
    }

    // Treks created by user
    if (myTreks) {
      tempTreks = tempTreks.filter((trek) => {
        if (trek.attributes.creator.data) {
          return trek.attributes.creator.data.id === user.id;
        }

        // return new Error("No treks match these criterias");
      });
    }

    // Treks done by user
    if (treksDone) {
      const userTreksDone = Array.from(
        new Set(user.treksDone.map((trek) => trek.id))
      );

      tempTreks = tempTreks.filter((trek) => userTreksDone.includes(trek.id));
    }

    // Treks bookarmked by user
    if (bookmarks) {
      const userBookmarks = Array.from(
        new Set(user.bookmarks.map((trek) => trek.id))
      );

      tempTreks = tempTreks.filter((trek) => userBookmarks.includes(trek.id));
    }

    // Treks filtered by difficulty "Easy"
    if (easy) {
      tempTreks = tempTreks.filter(
        (trek) => trek.attributes.difficulty === "Easy"
      );
    }

    // Treks filtered by difficulty "Medium"
    if (medium) {
      tempTreks = tempTreks.filter(
        (trek) => trek.attributes.difficulty === "Medium"
      );
    }

    // Treks filtered by difficulty "Hard"
    if (hard) {
      tempTreks = tempTreks.filter(
        (trek) => trek.attributes.difficulty === "Hard"
      );
    }

    // Treks filtered by max duration
    if (duration >= minDuration && duration < maxDuration) {
      tempTreks = tempTreks.filter(
        (trek) => trek.attributes.duration <= duration
      );
    }

    return { ...state, filteredTreks: tempTreks };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
