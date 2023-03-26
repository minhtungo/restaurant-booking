import type { FC } from "react";
import { useState } from "react";
import ReactCalendar from "react-calendar";
import add from "date-fns/add";
import format from "date-fns/format";
import { CLOSING_HOUR, INTERVAL, OPENING_HOUR } from "@/constants/config";
import { getTimes } from "@/lib/getTimes";

interface CalendarProps {
  setDate: (date: DateTime) => void;
  date: DateTime;
}

const Calendar: FC<CalendarProps> = ({ setDate, date }) => {
  const times = getTimes(date.justDate);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date.justDate ? (
        <div className="flex gap-4">
          {times?.map((time, i) => (
            <div key={`time-${i}`} className="rounded-sm bg-gray-100 p-2">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR p-2"
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default Calendar;
