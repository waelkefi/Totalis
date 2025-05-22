import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

/**
 * Un exemple de composant "DayView" qui gère :
 *  - L'affichage des heures (0..23)
 *  - Les tâches (événements) dans un planning
 *  - Le drag & drop et resize d'une tâche (via react-rnd)
 *  - L'ajout / suppression d'une tâche
 *
 *  Approche simplifiée :
 *  - 1 heure = 60 px en hauteur
 *  - top = heure_de_début * 60
 *  - height = (heure_de_fin - heure_de_début) * 60
 *  - On stocke tout dans un state local
 */

const DayViewWithTasks = () => {
  // État pour la date sélectionnée
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Tâches par défaut (structure minimaliste)
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tâche 1', startHour: 9, endHour: 10, color: '#4285F4' },
    { id: 2, title: 'Tâche 2', startHour: 10, endHour: 12, color: '#DB4437' },
    { id: 3, title: 'Tâche 3', startHour: 14, endHour: 15, color: '#F4B400' },
  ]);

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

  /**
   * Aller au jour précédent
   */
  const goPrevDay = () => {
    setSelectedDate((prev) => prev.subtract(1, 'day'));
  };

  /**
   * Aller au jour suivant
   */
  const goNextDay = () => {
    setSelectedDate((prev) => prev.add(1, 'day'));
  };

  // Tableau [0..23] pour l'affichage des heures
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div style={styles.container}>
      {/* Barre de navigation du jour */}
      <div style={styles.header}>
        <button onClick={goPrevDay} style={styles.navBtn}>
          Jour précédent
        </button>
        <h2 style={{ margin: '0 16px' }}>
          {selectedDate.format('dddd, D MMMM YYYY')}
        </h2>
        <button onClick={goNextDay} style={styles.navBtn}>
          Jour suivant
        </button>
      </div>

      {/* Bouton pour ajouter une tâche */}
      <button onClick={handleAddTask} style={styles.addBtn}>
        + Ajouter une tâche
      </button>

      {/* Planning */}
      <div style={styles.calendarWrapper}>
        <div style={{ position: 'relative', height: hours.length * 60 }}>
          {/* Lignes horaires */}
          {hours.map((hour) => (
            <div key={hour} style={{ ...styles.hourLine, top: hour * 60 }}>
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}

          {/* Affichage des tâches */}
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
  );
};

export default DayViewWithTasks;

// --- Styles ---
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '700px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  navBtn: {
    padding: '8px 12px',
    cursor: 'pointer',
  },
  addBtn: {
    marginBottom: '16px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  calendarWrapper: {
    position: 'relative',
    height: '100%',
    overflowY: 'auto',
  },
  hourLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '60px', // 1h = 60px
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    boxSizing: 'border-box',
    fontSize: '12px',
    color: '#666',
  },
  taskBox: {
    position: 'absolute',
    color: '#fff',
    borderRadius: '4px',
    padding: '4px',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  taskContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  deleteBtn: {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '2px 6px',
    fontSize: '12px',
  },
};
