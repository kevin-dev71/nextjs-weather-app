export const getDateFromDateTime = (unixTimestamp: number, options = {}) => {
  const datetime = new Date(unixTimestamp * 1000);
  // Custom value for inversion of control
  const customValue = datetime.toLocaleString([], options);

  const date = datetime.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const hour = datetime.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const monthName = datetime.toLocaleString([], {
    month: "short",
  });

  const weekday = datetime.toLocaleString([], {
    weekday: "short",
  });

  const day = datetime.toLocaleString([], {
    day: "2-digit",
  });

  return { date, hour, weekday, monthName, customValue, day };
};
