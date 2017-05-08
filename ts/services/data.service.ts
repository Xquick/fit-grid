/// <reference path="../ref.ts" />

module portal {
    'use strict';

    export interface IDataService {
        loadExerciseList(): ng.IPromise<portal.Exercise[]>;
        loadExerciseHistory(user_id: number): ng.IPromise<json.IWorkoutHistory[]>;
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

        loadExerciseList(): ng.IPromise<portal.Exercise[]> {
            return this.$http.get(portal.config.api.url + 'exercises/', {})
                .then(function (response: json.IExerciseList) {
                    return <Exercise[]>response.data.exerciseList;
                });
        }

        loadExerciseHistory(user_id: number): ng.IPromise<json.IWorkoutHistory[]> {
            return this.$http.get(portal.config.api.url + 'users/' + user_id + '/history')
                .then(function (response: json.IWorkoutHistoryList) {
                    return <json.IWorkoutHistory[]>response.data;
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

angular.module('portal').service('$dataService', portal.DataService);