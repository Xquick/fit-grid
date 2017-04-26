///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export interface IFilter {
        northeastLat: string;
    }

    export class MainController {
        public $dataService: IDataService;
        public $translate: translate.ITranslateProvider;
        public filter: IFilter;
        public $sidenav;
        public $dialog;
        public $scope: ng.IScope;

        static $inject = ['$scope', '$DataService', '$mdDialog', '$mdSidenav', '$translate'];

        constructor($scope, $dataService, $mdDialog, $mdSidenav, $translate) {
            this.$dataService = $dataService;
            this.$dialog = $mdDialog;
            this.$scope = $scope;
            this.$translate = $translate;
            this.$sidenav = $mdSidenav;

            this.getExercises();
        }

        protected getExercises(): void {
            this.$dataService.loadExercises().then((exercises) => {
                this.$dataService.exerciseList = exercises;
                this.$dataService.exerciseListByTypes = [];
                let exerciseArr = [];

                _.each(exercises, exercise => {
                    if (typeof exerciseArr[exercise.type] === 'undefined') {
                        exerciseArr[exercise.type] = [];
                    }
                    exerciseArr[exercise.type].push(exercise);
                });

                for (let key in exerciseArr) {
                    let exerciseType: IExerciseType = <IExerciseType>{};

                    exerciseType.name = key;
                    exerciseType.exercises = exerciseArr[key];

                    this.$dataService.exerciseListByTypes.push(exerciseType);
                }

            });
        }

        public toggleWorkout() {
            this.$sidenav('right').toggle();
        }
    }
    angular.module('portal').controller('MainController', portal.MainController);
}