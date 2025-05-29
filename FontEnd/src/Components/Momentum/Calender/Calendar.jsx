// import React, { useEffect, useState } from 'react';
// import ActionsSidebar from './ActionsSidebar';
// import CalendarEvent from './CalendarEvent';
// import dayjs from 'dayjs';
// import './Calendar.css';

// const Calendar = ({ tasks, setTasks }) => {
//   const [events, setEvents] = useState([]);
//   const [draggedAction, setDraggedAction] = useState(null);
//   const [draggedEvent, setDraggedEvent] = useState(null);

//   const [weekDate, setWeekDate] = useState(dayjs());
//   const startOfWeek = weekDate.startOf('week');
//   const endOfWeek = startOfWeek.add(6, 'day');

//   const days = Array.from({ length: 7 }, (_, i) => {
//     const d = startOfWeek.add(i, 'day');
//     return {
//       name: d.format('dddd'),
//       date: d.format('D MMM'),
//       dayjs: d,
//       key: d.format('dddd').toLowerCase(),
//     };
//   });

//   const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

//   const prevWeek = () => setWeekDate(weekDate.subtract(1, 'week'));
//   const nextWeek = () => setWeekDate(weekDate.add(1, 'week'));

//   const availableActions = events

//   // 🔽 Filtrage des tâches de la semaine sélectionnée
//   useEffect(() => {
//     if (tasks && tasks.length > 0) {
//       const filteredTasks = tasks.filter(task => {
//         const taskDate = dayjs(task.date);
//         return taskDate.isAfter(startOfWeek.subtract(1, 'day')) && taskDate.isBefore(endOfWeek.add(1, 'day'));
//       });

//       const mappedEvents = filteredTasks.map(task => {
//         const taskDate = dayjs(task.date);
//         const dayKey = taskDate.format('dddd').toLowerCase();
//         return {
//           id: task._id,
//           name: task.title,
//           color: '#3498db',
//           day: dayKey,
//           startHour: parseInt(task.startHour.split(':')[0]),
//           duration: parseInt(task.endHour.split(':')[0]) - parseInt(task.startHour.split(':')[0]),
//         };
//       });

//       setEvents(mappedEvents);
//     }
//   }, [tasks, startOfWeek, endOfWeek]);

//   const handleDrop = (day, hour) => {
//     if (draggedAction) {
//       const newEvent = {
//         id: `event_${Date.now()}`,
//         actionId: draggedAction.id,
//         name: draggedAction.name,
//         color: draggedAction.color,
//         day: day,
//         startHour: parseInt(hour.split(':')[0]),
//         duration: draggedAction.duration,
//       };
//       setEvents([...events, newEvent]);
//       setDraggedAction(null);
//     } else if (draggedEvent) {
//       updateEventPosition(draggedEvent.id, day, parseInt(hour.split(':')[0]));
//       setDraggedEvent(null);
//     }
//   };

//   const handleDragOver = (e) => e.preventDefault();

//   const updateEventDuration = (eventId, newDuration) => {
//     setEvents(events.map(event => event.id === eventId ? { ...event, duration: newDuration } : event));
//   };

//   const updateEventPosition = (eventId, newDay, newStartHour) => {
//     setEvents(events.map(event => event.id === eventId ? { ...event, day: newDay, startHour: newStartHour } : event));
//   };

//   const deleteEvent = (eventId) => {
//     setEvents(events.filter(event => event.id !== eventId));
//   };

//   const getEventsForSlot = (day, hour) => {
//     const hourNum = parseInt(hour.split(':')[0]);
//     return events.filter(event => 
//       event.day === day &&
//       hourNum >= event.startHour &&
//       hourNum < event.startHour + event.duration
//     );
//   };

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <button className="week-nav-btn" onClick={prevWeek}>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//             <path d="M15 6C15 6 9 10.42 9 12C9 13.58 15 18 15 18" stroke="#15133A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//           Last week
//         </button>
//         <h2 className="week-title">{startOfWeek.format("DD MMM")} - {endOfWeek.format("DD MMM")}</h2>
//         <button className="week-nav-btn" onClick={nextWeek}>
//           Next week
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//             <path d="M9 6C9 6 15 10.42 15 12C15 13.58 9 18 9 18" stroke="#15133A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//       </div>

//       <div className="calendar-main">
//         <ActionsSidebar actions={availableActions} setDraggedAction={setDraggedAction} />

//         <div className="calendar-grid">
//           <div className="calendar-table">
//             <div className="calendar-row header-row">
//               <div className="time-column"></div>
//               {days.map(day => (
//                 <div key={day.key} className="day-header">
//                   <div className="day-name">{day.name}</div>
//                   <div className="day-date">{day.date}</div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ height: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
//               {hours.map(hour => (
//                 <div key={hour} className="calendar-row">
//                   <div className="time-slot">{hour}</div>
//                   {days.map(day => (
//                     <div
//                       key={`${day.key}-${hour}`}
//                       className="calendar-cell"
//                       onDrop={() => handleDrop(day.key, hour)}
//                       onDragOver={handleDragOver}
//                     >
//                       {getEventsForSlot(day.key, hour).map(event =>
//                         event.startHour === parseInt(hour.split(':')[0]) && (
//                           <CalendarEvent
//                             key={event.id}
//                             event={event}
//                             onUpdateDuration={updateEventDuration}
//                             onUpdatePosition={updateEventPosition}
//                             onDelete={deleteEvent}
//                             setDraggedEvent={setDraggedEvent}
//                           />
//                         )
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ActionsSidebar from './ActionsSidebar';
import CalendarEvent from './CalendarEvent';
import dayjs from 'dayjs';
import './Calendar.css';

const Calendar = ({ tasks, setTasks }) => {
  const [events, setEvents] = useState([]);
  const [draggedAction, setDraggedAction] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [weekDate, setWeekDate] = useState(dayjs());

  // Mémoisation des dates de la semaine
  const weekDates = useMemo(() => {
    const startOfWeek = weekDate.startOf('week');
    const endOfWeek = startOfWeek.add(6, 'day');
    
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = startOfWeek.add(i, 'day');
      return {
        name: d.format('dddd'),
        date: d.format('D MMM'),
        dayjs: d,
        key: d.format('dddd').toLowerCase(),
      };
    });

    return { startOfWeek, endOfWeek, days };
  }, [weekDate]);

  // Mémoisation des heures
  const hours = useMemo(() => 
    Array.from({ length: 24 }, (_, i) => `${i}:00`)
  , []);

  // Mémoisation du titre de la semaine
  const weekTitle = useMemo(() => 
    `${weekDates.startOfWeek.format("DD MMM")} - ${weekDates.endOfWeek.format("DD MMM")}`
  , [weekDates.startOfWeek, weekDates.endOfWeek]);

  // Actions de navigation optimisées
  const prevWeek = useCallback(() => 
    setWeekDate(prev => prev.subtract(1, 'week'))
  , []);

  const nextWeek = useCallback(() => 
    setWeekDate(prev => prev.add(1, 'week'))
  , []);

  // Utilitaire pour parser les heures
  const parseHour = useCallback((hourString) => {
    if (typeof hourString === 'string') {
      return parseInt(hourString.split(':')[0]);
    }
    return parseInt(hourString);
  }, []);

  // Filtrage et transformation des tâches optimisés
  useEffect(() => {
    if (!tasks?.length) {
      setEvents([]);
      return;
    }

    const { startOfWeek, endOfWeek } = weekDates;
    
    const mappedEvents = tasks
      .filter(task => {
        const taskDate = dayjs(task.date);
        return taskDate.isAfter(startOfWeek.subtract(1, 'day')) && 
               taskDate.isBefore(endOfWeek.add(1, 'day'));
      })
      .map(task => {
        const taskDate = dayjs(task.date);
        const startHour = parseHour(task.startHour);
        const endHour = parseHour(task.endHour);
        
        return {
          id: task._id,
          name: task.title,
          color: '#3498db',
          day: taskDate.format('dddd').toLowerCase(),
          startHour,
          duration: Math.max(1, endHour - startHour), // Durée minimale de 1h
        };
      });

    setEvents(mappedEvents);
  }, [tasks, weekDates, parseHour]);

  // Gestionnaire de drop optimisé
  const handleDrop = useCallback((day, hour) => {
    const hourNum = parseHour(hour);
    
    if (draggedAction) {
      const newEvent = {
        id: `event_${Date.now()}`,
        actionId: draggedAction.id,
        name: draggedAction.name,
        color: draggedAction.color,
        day: day,
        startHour: hourNum,
        duration: draggedAction.duration || 1,
      };
      setEvents(prev => [...prev, newEvent]);
      setDraggedAction(null);
    } else if (draggedEvent) {
      updateEventPosition(draggedEvent.id, day, hourNum);
      setDraggedEvent(null);
    }
  }, [draggedAction, draggedEvent, parseHour]);

  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  // Mise à jour des événements optimisée
  const updateEventDuration = useCallback((eventId, newDuration) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, duration: Math.max(1, newDuration) }
        : event
    ));
  }, []);

  const updateEventPosition = useCallback((eventId, newDay, newStartHour) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, day: newDay, startHour: newStartHour }
        : event
    ));
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  // Récupération des événements pour un slot optimisée avec mémoisation
  const getEventsForSlot = useCallback((day, hour) => {
    const hourNum = parseHour(hour);
    return events.filter(event => 
      event.day === day &&
      hourNum >= event.startHour &&
      hourNum < event.startHour + event.duration
    );
  }, [events, parseHour]);

  // Actions disponibles : tâches sans heures de début et fin définies
  const availableActions = useMemo(() => {
    if (!tasks?.length) return [];
      const { startOfWeek, endOfWeek } = weekDates;
    return tasks
      .filter(task => {
        const taskDate = dayjs(task.date);
        const hasValidStartHour = task.startHour && task.startHour.trim() !== '';
        const hasValidEndHour = task.endHour && task.endHour.trim() !== '';
        return taskDate.isAfter(startOfWeek.subtract(1, 'day')) && 
               taskDate.isBefore(endOfWeek.add(1, 'day')) && (!hasValidStartHour || !hasValidEndHour);
      })
      // .filter(task => {
      //   // Filtrer les tâches qui n'ont pas d'heures définies ou invalides
      //   const hasValidStartHour = task.startHour && task.startHour.trim() !== '';
      //   const hasValidEndHour = task.endHour && task.endHour.trim() !== '';
        
      //   return !hasValidStartHour || !hasValidEndHour;
      // })
      .map(task => ({
        id: task._id,
        name: task.title,
        color: '#e74c3c', // Couleur différente pour les actions non planifiées
        duration: 1, // Durée par défaut d'1 heure
        status: task.status,
        originalTask: task
      }));
  }, [tasks,weekDates, parseHour]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="week-nav-btn" onClick={prevWeek} aria-label="Semaine précédente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6C15 6 9 10.42 9 12C9 13.58 15 18 15 18" 
                  stroke="#15133A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Last week
        </button>
        
        <h2 className="week-title">{weekTitle}</h2>
        
        <button className="week-nav-btn" onClick={nextWeek} aria-label="Semaine suivante">
          Next week
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6C9 6 15 10.42 15 12C15 13.58 9 18 9 18" 
                  stroke="#15133A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="calendar-main">
        <ActionsSidebar actions={availableActions} setDraggedAction={setDraggedAction} />

        <div className="calendar-grid">
          <div className="calendar-table">
            {/* En-tête du calendrier */}
            <div className="calendar-row header-row">
              <div className="time-column" aria-label="Colonne des heures"></div>
              {weekDates.days.map(day => (
                <div key={day.key} className="day-header">
                  <div className="day-name">{day.name}</div>
                  <div className="day-date">{day.date}</div>
                </div>
              ))}
            </div>

            {/* Corps du calendrier */}
            <div className="calendar-body" style={{ height: '100%', overflowY: 'auto', paddingBottom: '100px' }}>
              {hours.map(hour => (
                <div key={hour} className="calendar-row">
                  <div className="time-slot" aria-label={`Heure ${hour}`}>
                    {hour}
                  </div>
                  {weekDates.days.map(day => (
                    <CalendarCell
                      key={`${day.key}-${hour}`}
                      day={day}
                      hour={hour}
                      events={getEventsForSlot(day.key, hour)}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onUpdateDuration={updateEventDuration}
                      onUpdatePosition={updateEventPosition}
                      onDelete={deleteEvent}
                      setDraggedEvent={setDraggedEvent}
                      parseHour={parseHour}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant séparé pour optimiser le rendu des cellules
const CalendarCell = React.memo(({ 
  day, 
  hour, 
  events, 
  onDrop, 
  onDragOver, 
  onUpdateDuration, 
  onUpdatePosition, 
  onDelete, 
  setDraggedEvent,
  parseHour 
}) => {
  const handleDrop = useCallback(() => onDrop(day.key, hour), [onDrop, day.key, hour]);
  
  return (
    <div
      className="calendar-cell"
      onDrop={handleDrop}
      onDragOver={onDragOver}
      aria-label={`Cellule ${day.name} à ${hour}`}
    >
      {events.map(event => {
        const isEventStart = event.startHour === parseHour(hour);
        return isEventStart && (
          <CalendarEvent
            key={event.id}
            event={event}
            onUpdateDuration={onUpdateDuration}
            onUpdatePosition={onUpdatePosition}
            onDelete={onDelete}
            setDraggedEvent={setDraggedEvent}
          />
        );
      })}
    </div>
  );
});

CalendarCell.displayName = 'CalendarCell';

export default Calendar;