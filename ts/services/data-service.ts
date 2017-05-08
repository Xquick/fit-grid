
/// <reference path="../ref.ts" />

module portal {
    'use strict';

    export interface IDataService {
        exerciseListByTypes: portal.IExerciseType[];
        exerciseList: portal.Exercise[];
        exercise: portal.Exercise;

        loadExercises(): ng.IPromise<portal.Exercise[]>;
        loadExerciseHistory(user_id: number): ng.IPromise<json.IExerciseHistory[]>;
        getExerciseDetail(exerciseId: number): portal.Exercise;
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

        loadExercises(): ng.IPromise<portal.Exercise[]> {
            return this.$http.get(portal.config.api.url + 'exercises/', {})
                .then(function (response: json.IExerciseList) {
                    return <Exercise[]>response.data.exercises;
                });
        }

        loadExerciseHistory(user_id: number): ng.IPromise<json.IExerciseHistory[]> {
            return this.$http.get(portal.config.api.url + 'user/' + user_id + '/history')
                .then(function (response: json.IExerciseHistory[]) {
                    return <json.IExerciseHistory[]>response;
                });
        }

        getExerciseDetail(exerciseId: number): portal.Exercise {
            if (this.exerciseList) {
                console.log('advert detail', _.find(this.exerciseList, {'id': exerciseId}));
                return _.find(this.exerciseList, {'id': exerciseId});
            }
        }
    }
}

angular.module('portal').service('$DataService', portal.DataService);