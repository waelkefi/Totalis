// import React from "react";
// import { Button } from "react-bootstrap";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import dayjs from "dayjs";
// import "dayjs/locale/fr";

// dayjs.locale("fr");

// const MonthSelector = ({ date, onDateChange }) => {
//   const handlePrevMonth = () => {
//     onDateChange(date.subtract(1, "month"));
//   };

//   const handleNextMonth = () => {
//     onDateChange(date.add(1, "month"));
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center border rounded p-3 mx-auto" style={{ maxWidth: "300px" }}>
//       <Button variant="light" onClick={handlePrevMonth}>
//         <FaArrowLeft />
//       </Button>
//       <div className="mx-3 fw-bold fs-4 text-capitalize">{date.format("MMMM")}</div>
//       <Button variant="light" onClick={handleNextMonth}>
//         <FaArrowRight />
//       </Button>
//     </div>
//   );
// };

// export default MonthSelector;

import React from "react";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MonthSelector = ({ date, onDateChange }) => {
  return (
    <div className="curstum-card d-flex align-items-center justify-content-between" style={{height:"50px"}}>
      {months.map((month, index) => (
        <button 
          key={index} 
          className={date.month() === index ? "btn custum-month-btn-active" : "btn custum-month-btn"} 
          onClick={() => onDateChange(dayjs(date).month(index))}
       
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default MonthSelector;

