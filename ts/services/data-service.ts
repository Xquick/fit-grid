/**
 * Created by amrazek on 21/03/16.
 */

/// <reference path="../ref.ts" />

module portal {
    'use strict';

    export interface IDataService {
        exerciseListByTypes: portal.IExerciseType[];
        exerciseList: portal.Exercise[];
        exercise: portal.Exercise;

        loadExercises(): ng.IPromise<portal.Exercise[]>;
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
            return this.$http.post(portal.config.api.url + '/data/exercises.json', {})
                .then(function (response: IJsonExercises) {
                    return <Exercise[]>response.data.exercises;
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