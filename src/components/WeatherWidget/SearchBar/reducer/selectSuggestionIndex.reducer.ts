function reducer(state: number, action: { type: string; payload: number }) {
  const lengthOfResults = action.payload;
  switch (action.type) {
    case "arrowUp":
      return state === 0 ? lengthOfResults : state - 1;
    case "arrowDown":
      return state === lengthOfResults ? 0 : state + 1;
    case "reset":
      return 0;
    default:
      return action.payload ?? 0;
  }
}

export default reducer;
