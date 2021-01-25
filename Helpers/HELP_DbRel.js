import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const initWrkRelExMN = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS workoutRelExercises (idWorkout INTEGER NOT NULL, idExercise INTEGER NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const insertWrkRelExMN = (workoutID, exerciseID) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO workoutRelExercises (idWorkout, idExercise) VALUES (?,?)",
        [workoutID, exerciseID],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const fetchWrkRelExMN = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT e.* FROM exercises e INNER JOIN workoutRelExercises we ON e.id = we.idExercise INNER JOIN workouts w ON we.idWorkout = w.workoutId WHERE w.workoutId = ${id}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

//Ich brauche hier  noch ein delete
