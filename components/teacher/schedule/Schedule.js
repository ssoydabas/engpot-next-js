import React, { useRef, useState } from "react";
import styles from "./Schedule.module.css";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import AddLesson from "./addLesson/AddLesson";
import RemoveLesson from "./removeLesson/RemoveLesson";

function Schedule(props) {
  const [addLesson, setAddLesson] = useState(null);
  const [removeLesson, setRemoveLesson] = useState(null);

  const calendarRef = useRef();

  const { teacherSchedule } = props;

  const dayHeader = styles["day-header"];
  const dayCell = styles["day-cell"];
  const slotLabel = styles["slot-label"];
  const slotLaneLabel = styles["slot-lane-label"];

  const selectHandler = (e) => {
    const startTime = e.start;
    const endTime = e.end;

    setAddLesson({ start: startTime, end: endTime });
  };

  const eventClickHandler = (e) => {
    const lessonId = e.event._def.publicId;
    setRemoveLesson(lessonId);
  };

  return (
    <div className={styles["schedule"]}>
      <FullCalendar
        innerRef={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        eventStartEditable={true}
        selectable
        titleFormat={{ month: "short", day: "numeric" }}
        dayHeaders={true}
        dayHeaderFormat={{ weekday: "long" }}
        dayHeaderClassNames={dayHeader}
        slotLabelFormat={{ hour: "numeric" }}
        slotMinTime={"09:00:00"}
        slotMaxTime={"22:00:00"}
        firstDay={"1"}
        height={"102%"}
        nowIndicator={true}
        events={teacherSchedule}
        select={selectHandler}
        eventClick={eventClickHandler}
      />
      {addLesson && <AddLesson setAddLesson={setAddLesson} />}
      {removeLesson && <RemoveLesson setRemoveLesson={setRemoveLesson} />}
    </div>
  );
}

export default Schedule;
