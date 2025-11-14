import React, { useState } from "react";
import './Calendar.css';


const Calendar = ({ onSelectDate }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateSelectedDate = (year, month, day) => {
    const formattedDate = `${year}/${month + 1}/${day}`;
    onSelectDate(formattedDate); // 將日期回傳給父組件
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= lastDateOfMonth; i++) {
      daysArray.push(i);
    }

    return { year, month, daysArray };
  };

  const { year, month, daysArray } = generateCalendar();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
          &lt;
        </button>
        <span>{year} 年 {today.toLocaleString('zh-TW', { month: 'long' })}</span>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
          &gt;
        </button>
      </div>

      <div className="weekdays">
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="days">
        {daysArray.map((day, index) =>
          day === null ? (
            <div key={index}></div>
          ) : (
            <div
              key={index}
              className={`day ${day === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth()
                ? "today"
                : ""
                }`}
              onClick={() => updateSelectedDate(year, month, day)}
            >
              {day}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
