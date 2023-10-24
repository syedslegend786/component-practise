/* eslint-disable @next/next/no-img-element */
"use client";
import {
  add,
  eachDayOfInterval,
  endOfISOWeekYear,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getWeekOfMonth,
  isFirstDayOfMonth,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
} from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
const days = ["S", "M", "T", "W", "T", "F", "S"];
const meetings = [
  {
    id: 1,
    name: "Salaries increase talk.",
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    startDateTime: "2023-10-23T10:00:00.00Z",
    endDateTime: "2023-10-23T11:00:00.00Z",
  },
  {
    id: 2,
    name: "Project abc meeting.",
    url: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
    startDateTime: "2023-10-26T10:00:00.00Z",
    endDateTime: "2023-10-26T11:00:00.00Z",
  },
  {
    id: 3,
    name: "Job interview.",
    url: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww",
    startDateTime: "2023-10-23T11:00:00.00Z",
    endDateTime: "2023-10-23T12:00:00.00Z",
  },
  {
    id: 4,
    name: "Manager meeting.",
    url: "https://plus.unsplash.com/premium_photo-1674777843203-da3ebb9fbca0?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    startDateTime: "2023-10-23T12:00:00.00Z",
    endDateTime: "2023-10-23T13:00:00.00Z",
  },
];
function Home() {
  let today = startOfToday();
  const [selectedDay, setselectedDay] = useState(today);
  const [currentMonth, setcurrentMonth] = useState(format(today, "MMMM-yyyy"));
  const firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  let newDays = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  });
  function nextMonth() {
    const newDate = add(firstDayOfCurrentMonth, { months: 1 });
    setcurrentMonth(format(newDate, "MMMM-yyyy"));
  }
  function previousMonth() {
    const newDate = add(firstDayOfCurrentMonth, { months: -1 });
    setcurrentMonth(format(newDate, "MMMM-yyyy"));
  }
  const currentDateMeetings = meetings.filter((fMeeting) =>
    isSameDay(parseISO(fMeeting.startDateTime), selectedDay)
  );
  return (
    <div className="p-16 gap-3  min-h-screen flex items-center justify-center">
      <div className="flex items-center md:flex-row flex-col md:gap-0 gap-5">
        <div className="w-[400px] border-r px-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              {format(firstDayOfCurrentMonth, "MMMM yyyy")}
            </h1>
            <div className="flex items-center gap-3">
              <button onClick={previousMonth}>
                <ChevronLeftIcon
                  className="cursor-pointer text-gray-400 hover:text-gray-500"
                  size={16}
                />
              </button>
              <button onClick={nextMonth}>
                <ChevronRightIcon
                  className="cursor-pointer text-gray-400 hover:text-gray-500"
                  size={16}
                />
              </button>
            </div>
          </div>
          <div className="mt-3">
            <div className="grid grid-cols-7">
              {days.map((item, index) => (
                <div className=" py-2 grid place-items-center w" key={index}>
                  <div className="w-7 h-7 grid place-items-center cursor-pointer text-xs">
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {newDays.map((day, index) => {
                const is_selected_same_day = isSameDay(selectedDay, day);
                return (
                  <div
                    className={cn(
                      `relative py-2 grid place-items-center 
                    `,
                      {
                        "border-t": isSameMonth(day, firstDayOfCurrentMonth),
                      }
                    )}
                    key={index}
                  >
                    <button
                      type="button"
                      onClick={() => setselectedDay(day)}
                      className={cn(
                        "relative w-7 h-7 hover:bg-gray-200 rounded-full grid place-items-center cursor-pointer text-xs text-gray-400",
                        {
                          "text-gray-900 ": isSameMonth(
                            day,
                            firstDayOfCurrentMonth
                          ),
                          "text-rose-500": isToday(day),
                          "bg-rose-500 text-white hover:bg-rose-500 hover:text-white":
                            is_selected_same_day,
                          "bg-gray-900 text-white hover:text-white hover:bg-gray-900":
                            is_selected_same_day && !isToday(day),
                        }
                      )}
                    >
                      {format(day, "d")}
                    </button>
                    {meetings.find((m) =>
                      isSameDay(day, parseISO(m.startDateTime))
                    ) ? (
                      <div className="absolute h-1 w-1 rounded-full bg-sky-500 mx-auto bottom-[1px]" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="self-start px-4">
          <h1 className="font-semibold">
            Schedule for {format(selectedDay, "MMMM dd, yyyy")}
          </h1>
          <div className="mt-3">
            {currentDateMeetings.length > 0 ? (
              currentDateMeetings.map((meeting, index) => (
                <Meeting key={index} meeting={meeting} />
              ))
            ) : (
              <p className="text-sm text-gray-500">No meetings today.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
const Meeting = ({ meeting }: { meeting: (typeof meetings)[0] }) => {
  return (
    <div className="group p-4 hover:bg-gray-100 rounded-xl  font-light gap-4 w-max max-w-full flex items-center justify-between">
      <div className="flex gap-4">
        <img
          src={meeting.url}
          alt=""
          className="align-middle h-12 w-12 rounded-full overflow-hidden object-cover"
        />
        <div className="space-y-2">
          <p className="text-sm">{meeting.name}</p>
          <p className="text-sm text-gray-500">
            {format(parseISO(meeting.startDateTime), "h:mm a")} -{" "}
            {format(parseISO(meeting.endDateTime), "h:mm a")}
          </p>
        </div>
      </div>
      <button className="opacity-0 group-hover:opacity-100">
        <MoreVerticalIcon className="text-gray-500" size={20} />
      </button>
    </div>
  );
};
