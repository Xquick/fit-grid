/// <reference path="../ref.ts" />

module portal {
    'use strict';

    export interface IDataService {
        loadExerciseList(): ng.IPromise<portal.Exercise[]>;
        loadExerciseHistory(): ng.IPromise<json.IWorkoutHistory[]>;
        getExerciseDetail(exerciseId: number): portal.Exercise;
        persistWorkout(workout: ICurrentWorkout): ng.IPromise<boolean>;
    }

    export class DataService implements IDataService {
        public exerciseListByTypes: portal.IExerciseType[];
        public exerciseList: portal.Exercise[];
        public exercise: portal.Exercise;

        static $inject = ['$http', '$q', '$rootScope'];

        constructor(private $http: ng.IHttpService,
                    private $q: ng.IQService,
                    private $rootScope: ng.IRootScopeService) {
            this.exerciseListByTypes = [];
        }

        loadExerciseList(): ng.IPromise<portal.Exercise[]> {
            return this.$http.get(portal.config.api.url + 'exercises/', {})
                .then(function (response: json.IExerciseList) {
                    return <Exercise[]>response.data.exerciseList;
                });
        }

        loadExerciseHistory(): ng.IPromise<json.IWorkoutHistory[]> {
            return this.$http.get(portal.config.api.url + 'users/' + 1 + '/history')
                .then(function (response: json.IWorkoutHistoryList) {
                    return <json.IWorkoutHistory[]>response.data;
                });
        }

        getExerciseDetail(exerciseId: number): portal.Exercise {
            if (this.exerciseList) {
                return _.find(this.exerciseList, {'id': exerciseId});
            }
        }

        persistWorkout(workout: ICurrentWorkout): ng.IPromise<boolean> {
            return this.$http.post(portal.config.api.url + 'users/' + 1 + '/workouts', {
                id: 1,
                date: workout.date.format(portal.config.date.mediumFormat),
                name: workout.name,
                exerciseList: workout.exerciseList

            }).then(function (response) {
                return true;
            });
        }
    }
}

angular.module('portal').service('$dataService', portal.DataService);