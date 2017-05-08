///<reference path="../ref.ts"/>

module portal {
    'use strict';


    export class Exercise implements portal.IExercise {
        id: number;
        name: string;
        type: string;
        schedule: IExerciseSchedule[];

        constructor(exercise: json.IExercise) {
            this.id = exercise.id;
            this.name = exercise.name;
            this.type = exercise.type;
        }
    }
}