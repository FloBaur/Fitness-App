class MODEL_HistoryWorkout {
  constructor(id, title, workout, catId) {
    this.id = id;
    this.title = title;
    this.date = new Date();
    this.catId = catId;
    this.workout = workout;
  }
}

export default MODEL_HistoryWorkout;
