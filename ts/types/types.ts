/**
 * Created by amrazek on 03/07/16.
 */

/// <reference path="../ref.ts" />

module portal {
    'use strict';

    export interface IExercise {
        id: number;
        name: string;
        type: string;
        schedule: IExerciseSchedule[];
    }

    export interface ICurrentWorkoutExercise{
        id: number;
        name: string;
        type: string;
        isSuperset: boolean;
    }

    export interface IExerciseSchedule {
        date: string;
        setList: ISet[]
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
}
