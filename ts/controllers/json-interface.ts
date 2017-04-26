///<reference path="../ref.ts"/>

module portal {

    export interface IJsonExercises {
        data: {
            exercises: IJsonExercise[]
        }
    }

    export interface IJsonExercise {
        id: number;
        name: string;
        type: string;
    }

}