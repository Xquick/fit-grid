///<reference path="../ref.ts"/>

module portal.json {

    export interface IExerciseList {
        data: {
            exercises: IExercise[]
        }
    }

    export interface IExercise {
        id: number;
        name: string;
        type: string;
    }

    export interface ISet {
        id: number;
        setNumber: number;
        repCount: number;
        weight: number;
        workoutScheduleExerciseId: number;
    }

    export interface IExerciseScheduled extends IExercise {
        sets: ISet[]
    }

    export interface ISchedule {
        date: string;
        exercises: IExerciseScheduled[];
    }

    export interface IExerciseHistory {
        workout_id: number ;
        workout_name: string;
        schedule: ISchedule[]
    }
}