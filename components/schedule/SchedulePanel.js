import { useState } from "react";
import styles from "./SchedulePanel.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/Feedback";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import AddLesson from "./addLesson/AddLesson";
import RemoveLesson from "./removeLesson/RemoveLesson";

function SchedulePanel({ teacher, setTeacher, teacherSchedule, http }) {
  const dispatch = useDispatch();

  const [addLesson, setAddLesson] = useState(null);
  const [removeLesson, setRemoveLesson] = useState(null);

  const dayHeader = styles["day-header"];

  const selectHandler = (e) => {
    const startTime = e.start;
    const endTime = e.end;

    setAddLesson({ start: startTime, end: endTime });
  };

  const eventClickHandler = (e) => {
    const id = e.event._def.publicId;
    const title = e.event.title;
    const start = e.event.start;
    const end = e.event.end;
    setRemoveLesson({ id, title, start, end });
  };

  const eventDropHandler = (e) => {
    const { event } = e;

    const newEventId = event._def.publicId;

    const data = {
      userId: teacher._id,
      action: "dragDrop",
      event: {
        id: newEventId,
        title: event.title,
        start: event.start,
        end: event.end,
      },
    };
    const requestConfig = {
      url: `${process.env.API_URL}/publicSchedule/update`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
      body: data,
    };
    const dataProcessingLogic = (data) => {
      http.setIsLoading(false);
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      setAddLesson(null);
      setTeacher({ ...teacher });
    };
    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <div className={styles["schedule"]}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        eventStartEditable={true}
        selectable
        editable
        eventDurationEditable={false}
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
        eventDrop={eventDropHandler}
      />
      {addLesson && (
        <AddLesson
          teacher={teacher}
          setTeacher={setTeacher}
          addLesson={addLesson}
          setAddLesson={setAddLesson}
          http={http}
        />
      )}
      {removeLesson && (
        <RemoveLesson
          teacher={teacher}
          setTeacher={setTeacher}
          removeLesson={removeLesson}
          setRemoveLesson={setRemoveLesson}
          http={http}
        />
      )}
    </div>
  );
}

export default SchedulePanel;