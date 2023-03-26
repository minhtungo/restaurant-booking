import { CLOSING_HOUR, INTERVAL, OPENING_HOUR } from "@/constants/config";
import add from "date-fns/add";
import { useState } from "react";

import type { FC } from "react";
export const getTimes = (date: Date | null) => {
  if (!date) return;

  const beginning = add(date, { hours: OPENING_HOUR });
  const end = add(date, { hours: CLOSING_HOUR });
  const interval = INTERVAL;

  const times = [];

  for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
    times.push(i);
  }

  return times;
};
