/**
 * Created by amrazek on 10/07/16.
 */

///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export class Exercise implements portal.IExercise {
        private _id: number;
        private _name: string;
        private _type: string;
        private _order: number;
        private _repset: IRepSet[];

        constructor(id: number, name: string, type: string) {
            this._id = id;
            this._name = name;
            this._type = type;
        }

        get id(): number {
            return this._id;
        }

        set id(value: number) {
            this._id = value;
        }

        get name(): string {
            return this._name;
        }

        set name(value: string) {
            this._name = value;
        }

        get type(): string {
            return this._type;
        }

        set type(value: string) {
            this._type = value;
        }

        get order(): number {
            return this._order;
        }

        set order(value: number) {
            this._order = value;
        }

        get repset(): portal.IRepSet[] {
            return this._repset;
        }

        set repset(value: portal.IRepSet[]) {
            this._repset = value;
        }
    }
}