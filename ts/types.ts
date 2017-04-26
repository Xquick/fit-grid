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
    }

    export interface IExerciseType {
        name: string;
        exercises: Exercise[];
    }

    export interface ICalendarDays {
        weekday: number;
        date: string;
        abbreviation: string;
    }
}
