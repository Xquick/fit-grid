/**
 * Created by amrazek on 10/07/16.
 */

///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export class Exercise implements portal.IExercise {
        id: number;
        name: string;
        type: string;

        construct(id, name, type): void {
            this.id = id;
            this.name = name;
            this.type = type;
        }
    }
}