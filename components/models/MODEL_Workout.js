class MODEL_Workout {
    constructor(id, ownerId, categoryId, title, imageUrl, description, exerciseIds) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.exerciseIds = exerciseIds;
    }
}

export default MODEL_Workout;