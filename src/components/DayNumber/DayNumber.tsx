import { useState } from "react";
import CalendarCell from "../CalendarCell/CalendarCell";
import EventTag from "../EventTag/EventTag";
import AddEventModal from "../AddEventModal/AddEventModal";
import CalendarEvent from "../../models/event";
import EditEventModal from "../EditEventModal/EditEventModal";

interface Props {
  numberOfDays: number;
  initialPositionOfDay: number;
  currentDate: Date;
  events: CalendarEvent[];
  setAdded: (added: number) => void;
  added: number;
}

const DayNumber = ({ numberOfDays, initialPositionOfDay, currentDate, events, setAdded, added }: Props) => {
  const [showDayModal, setShowDayModal] = useState(0);
  const [eventToBeEdited, setEventToBeEdited] = useState<CalendarEvent | null>(null);

  const dayNumberOfWeek: number[] = Array.from(
    {length: numberOfDays},
    (_, index) => index + 1
  );

  // where in the week the day is positionated
  const positionOfDayWeek: number[] = Array.from(
    {length: initialPositionOfDay},
    (_, index) => index
  );

  // Get the events of each day of the month
  const getEventsByDay = (day: number): CalendarEvent[] => {
    return events.filter((event) => {
      return event.startDate.getDate() === day
    })
  }

  return (
    <div className="border-t border-l flex flex-wrap text-center w-[70.063rem]">
      {positionOfDayWeek.map((day) => (
        <CalendarCell
          key={day}
          className="text-sm border-r border-b w-[10rem] h-[5rem] p-2 bg-slate-100">
          {}
        </CalendarCell>
      ))}

      {dayNumberOfWeek.map((day) => (
        <CalendarCell
          key={day}
          className="text-sm border-r border-b w-[10rem] h-[5rem] p-2 bg-white">
            <div>
              {day}
              <button className="rounded-full py-0 px-2 mx-2 bg-zinc-600 hover:bg-zinc-800 text-neutral-50"
              onClick={() => setShowDayModal(day)}>+</button>
            </div>
            {getEventsByDay(day).map((event) => (
              <div className="cursor-pointer" onClick={() => {
                setEventToBeEdited(event);
                }}>
                <EventTag
                  event={event}
                />
              </div>
            ))}
        </CalendarCell>
      ))}

      {showDayModal !== 0 && (
        <AddEventModal
          day={showDayModal}
          setHideModal={() => setShowDayModal(0)}
          currentDate={currentDate}
          setAdded={setAdded}
          added={added}
        />
      )}

      {eventToBeEdited !== null && (
        <EditEventModal
          closeModal={() => setEventToBeEdited(null)}
          currentDate={currentDate}
          setAdded={setAdded}
          added={added}
          event={eventToBeEdited}
        />
      )}


    </div>
  )
}

export default DayNumber;