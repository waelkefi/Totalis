import React, { useRef, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Rnd } from 'react-rnd';
import "./styles.css"

function DayViewTest({ date = dayjs(), onDateChange, }) {
    const containerRef = useRef(null);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Tâche 1', startHour: 9, endHour: 10, color: '#4285F4' },
        { id: 2, title: 'Tâche 2', startHour: 10, endHour: 12, color: '#DB4437' },
        { id: 3, title: 'Tâche 3', startHour: 14, endHour: 15, color: '#F4B400' },
    ]);

    // Gestion du scroll pour passer au jour précédent / suivant
    // useEffect(() => {
    //     const container = containerRef.current;

    //     const handleWheel = (e) => {
    //         // Si on scrolle vers le haut (deltaY < 0) alors qu'on est déjà tout en haut
    //         if (e.deltaY < 0 && container.scrollTop === 0) {
    //             onDateChange(date.subtract(1, 'day'));
    //             // Repositionner le scroll tout en bas du nouveau jour
    //             // (petit setTimeout pour laisser le temps au composant de se re-render)
    //             setTimeout(() => {
    //                 container.scrollTop = container.scrollHeight - container.clientHeight;
    //             }, 0);

    //             // Éviter le scroll par défaut
    //             e.preventDefault();
    //         }
    //         // Si on scrolle vers le bas (deltaY > 0) alors qu'on est déjà tout en bas
    //         else if (
    //             e.deltaY > 0 &&
    //             container.scrollTop + container.clientHeight >= container.scrollHeight
    //         ) {
    //             onDateChange(date.add(1, 'day'));
    //             // Repositionner le scroll tout en haut
    //             setTimeout(() => {
    //                 container.scrollTop = 0;
    //             }, 0);

    //             e.preventDefault();
    //         }
    //     };

    //     // Écouter l'événement wheel sur le container
    //     container.addEventListener('wheel', handleWheel, { passive: false });

    //     return () => {
    //         container.removeEventListener('wheel', handleWheel, { passive: false });
    //     };
    // }, [date, onDateChange]);

    // Générer un tableau [0..23] pour chaque heure
    const hours = Array.from({ length: 24 }, (_, i) => i);



    /**
     * Ajoute une tâche par défaut (ex: 1h de durée)
     */
    const handleAddTask = () => {
        const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
        const newTask = {
            id: newId,
            title: `Tâche ${newId}`,
            startHour: 8,
            endHour: 9,
            color: '#0F9D58',
        };
        setTasks([...tasks, newTask]);
    };

    /**
     * Supprime une tâche
     */
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    /**
     * Mise à jour d'une tâche (drag / resize)
     * On reçoit un objet mis à jour (startHour, endHour, etc.)
     */
    const updateTask = (id, updates) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
        );
    };

    const weekdays = [
        { day: "Monday", date: "Apr 1" },
        { day: "Tuesday", date: "Apr 2" },
        { day: "Wednesday", date: "Apr 3" },
        { day: "Thursday", date: "Apr 4" },
        { day: "Friday", date: "Apr 5" },
        { day: "Saturday", date: "Apr 6" },
        { day: "Sunday", date: "Apr 7" }
    ];

    return (
        <>
            <div className="weekly-planning">
                <div className="week-navigation">
                    <button className="week-nav-btn">
                        <i className="bi bi-chevron-left"></i> Last week
                    </button>
                    <h3 className="week-title">Week of April 1, 2025</h3>
                    <button className="week-nav-btn">
                        Next week <i className="bi bi-chevron-right"></i>
                    </button>
                </div>

             
                <div className="weekly-planning">
                    {/* Navigation semaine (Last week, titre, Next week) */}


                    {/* Conteneur unique scrollable qui englobe toute la grille */}
                    <div className="week-scroll-container">
                        <div
                            className="weekdays-container"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '60px repeat(7, 1fr)',
                            }}
                        >
                            {/* gutter heures */}
                            <div className="time-gutter weekday-column">
                                <div className="weekday-header" style={{ background: "#f9f9ff", height: "65px" }}>
                                    {/* <div className="weekday-name">xx</div>
                                    <div className="weekday-date">xx</div> */}
                                </div>

                                <div style={{ position: 'relative', height: hours.length * 60 }}>
                                    {hours.map((hour) => (
                                        <div
                                            key={hour}
                                            style={{
                                                backgroundColor: "#E4E6FF",
                                                position: 'absolute',
                                                top: hour * 60,
                                                left: 0,
                                                right: 0,
                                                borderTop: '2px solid #fff',
                                                height: '65px',
                                                boxSizing: 'border-box',
                                                fontSize: '12px',
                                                display: 'flex',
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#262b5b",
                                                fontWeight: "600",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            {hour.toString().padStart(2, '0')}:00
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* colonnes jours */}
                            {weekdays.map((day, index) => {
                                const tasksForDay = tasks.filter(t => t.dayIndex === index);
                                return (
                                    <div key={index} className="weekday-column">
                                        <div className="weekday-header" style={{ height: "65px" }}>
                                            <div className="weekday-name">{day.day}</div>
                                            <div className="weekday-date">{day.date}</div>
                                        </div>

                                        {/* même grille de fond */}
                                        <div style={{ position: 'relative', height: hours.length * 60 }}>
                                            {hours.map((hour) => (
                                                <div
                                                    key={hour}
                                                    style={{
                                                        backgroundColor: "#F3F4FF",
                                                        position: 'absolute',
                                                        top: hour * 60,
                                                        left: 0,
                                                        right: 0,
                                                        borderTop: '2px solid #fff',
                                                        height: '65px',
                                                        boxSizing: 'border-box',
                                                    }}
                                                />
                                            ))}

                                            {/* tâches glissables */}
                                            {tasksForDay.map((task) => {
                                                const top = task.startHour * 60;
                                                const height = (task.endHour - task.startHour) * 60;
                                                return (
                                                    <Rnd
                                                        key={task.id}
                                                        bounds="parent"
                                                        default={{ x: 4, y: top, width: 'calc(100% - 8px)', height }}
                                                        position={{ x: 4, y: top }}
                                                        size={{ width: 'calc(100% - 8px)', height }}
                                                        onDragStop={(e, d) => {
                                                            const newStart = Math.floor(d.y / 60);
                                                            updateTask(task.id, {
                                                                startHour: newStart,
                                                                endHour: newStart + (task.endHour - task.startHour),
                                                            });
                                                        }}
                                                        onResizeStop={(e, dir, ref, delta, pos) => {
                                                            const newStart = Math.floor(pos.y / 60);
                                                            const newEnd = newStart + Math.ceil(ref.clientHeight / 60);
                                                            updateTask(task.id, { startHour: newStart, endHour: newEnd });
                                                        }}
                                                        style={{
                                                            backgroundColor: task.color,
                                                            borderRadius: '4px',
                                                            padding: '4px',
                                                            color: '#fff',
                                                        }}
                                                    >
                                                        <strong>{task.title}</strong><br />
                                                        {task.startHour}:00 - {task.endHour}:00
                                                        <br />
                                                        <button onClick={() => handleDeleteTask(task.id)}>Suppr.</button>
                                                    </Rnd>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
            <div className=" border rounded p-3 wrapper" >
                <h2 style={styles.title}>{date.format('dddd, D MMMM YYYY')}</h2>

                <button onClick={handleAddTask} style={styles.addBtn}>
                    + Ajouter une tâche
                </button>

                <div ref={containerRef} className="scrollContainer scroll">
                    <div style={{ position: 'relative', height: hours.length * 60 }}>
                        {/* Affichage de la grille des heures */}
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                style={{
                                    ...styles.hourLine,
                                    top: hour * 60,
                                }}
                            >
                                {hour.toString().padStart(2, '0')}:00
                            </div>
                        ))}

                        {/* Affichage des événements (positionnés en absolu) */}
                        {tasks.map((task) => {
                            // Position en pixels
                            const top = task.startHour * 60;
                            const height = (task.endHour - task.startHour) * 60;

                            return (
                                <Rnd
                                    key={task.id}
                                    bounds="parent"
                                    // Position initiale
                                    default={{
                                        x: 80, // on décale à droite pour ne pas chevaucher l'heure
                                        y: top,
                                        width: 200,
                                        height,
                                    }}
                                    // Position contrôlée (on recalcule si on modifie la tâche)
                                    position={{ x: 80, y: top }}
                                    size={{ width: 200, height }}
                                    onDragStop={(e, d) => {
                                        // d.y = nouvelle position en px
                                        const newStartHour = Math.max(0, Math.floor(d.y / 60));
                                        const duration = task.endHour - task.startHour;
                                        updateTask(task.id, {
                                            startHour: newStartHour,
                                            endHour: newStartHour + duration,
                                        });
                                    }}
                                    onResizeStop={(e, direction, ref, delta, position) => {
                                        // ref.clientHeight = nouvelle hauteur
                                        const newHeight = ref.clientHeight;
                                        const newStartHour = Math.max(0, Math.floor(position.y / 60));
                                        const newEndHour = newStartHour + Math.ceil(newHeight / 60);
                                        updateTask(task.id, {
                                            startHour: newStartHour,
                                            endHour: newEndHour,
                                        });
                                    }}
                                    style={{
                                        ...styles.taskBox,
                                        backgroundColor: task.color,
                                    }}
                                >
                                    <div style={styles.taskContent}>
                                        <strong>{task.title}</strong>
                                        <br />
                                        {task.startHour}:00 - {task.endHour}:00
                                        <br />
                                        <button
                                            style={styles.deleteBtn}
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </Rnd>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DayViewTest;

const styles = {

    title: {
        marginBottom: '8px',
        textTransform: 'capitalize', // Pour avoir lundi, mardi en français
    },
    hourLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: '60px', // 1h = 60px
        borderBottom: '2px solid #fff',
        padding: '0 8px',
        fontSize: '12px',
        color: '#666',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    eventBox: {
        position: 'absolute',
        left: '80px', // on décale à droite pour ne pas chevaucher l'heure
        width: '200px',
        borderRadius: '4px',
        color: '#fff',
        padding: '4px',
        boxSizing: 'border-box',
        fontSize: '14px',
    },
};
