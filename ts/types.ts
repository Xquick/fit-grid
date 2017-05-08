/**
 * Created by amrazek on 03/07/16.
 */

/// <reference path="ref.ts" />

module portal {
    'use strict';

    export interface IExercise {
        id: number;
        name: string;
        type: string;
        order: number;
        repset: IRepSet[];
    }

    export interface IRepSet {
        setNumber: number;
        reps: number;
        speed: number;
    }

    export interface IExerciseType {
        name: string;
        exerciseList: Exercise[];
    }

    export interface ICalendarDays {
        weekday: number;
        date: string;
        abbreviation: string;
    }


    export interface ISet {
        id: number;
        setNumber: number;
        repCount: number;
        weight: number;
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
