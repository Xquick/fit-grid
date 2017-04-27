///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export interface IFilter {
        northeastLat: string;
    }
    export interface IExtendedRootScope extends ng.IRootScopeService {
        selectedExerciseList: Exercise[];
    }

    export class MainController {
        public $dataService: IDataService;
        public $translate: translate.ITranslateProvider;
        public filter: IFilter;
        public $sidenav;
        public $dialog;
        public $rootScope: IExtendedRootScope;
        public $scope: ng.IScope;

        static $inject = ['$rootScope', '$scope', '$DataService', '$mdDialog', '$mdSidenav', '$translate'];

        constructor($rootScope, $scope, $dataService, $mdDialog, $mdSidenav, $translate) {
            this.$dataService = $dataService;
            this.$dialog = $mdDialog;
            this.$translate = $translate;
            this.$sidenav = $mdSidenav;
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$rootScope.selectedExerciseList = [];

            this.loadExercises();
        }

        protected loadExercises(): void {
            this.$dataService.loadExercisesJson().then((exercises) => {
                this.$dataService.exerciseList = exercises;
                this.$dataService.exerciseListByTypes = [];
                let exerciseArr = [];

                this.$dataService.exerciseListByTypes = this.sortExercisesByTypes(exercises);
            });
        }

        /***
         * Returns exercises sorted by their type (e.g. type: 'back', type: 'chest')
         *
         * @param exercises: Exercise[]
         * @returns {IExerciseType[]} resulting into structure e.g. {'chest': {[Exercise1, Exercise5]}, 'back': {[...]}}
         */
        private sortExercisesByTypes(exercises: Exercise[]): IExerciseType[] {
            let exerciseArr: {[key: string]: Exercise[]} = {};
            let exercisesByType: IExerciseType[] = [];

            _.each(exercises, exercise => {
                if (typeof exerciseArr[exercise.type] === 'undefined') {
                    exerciseArr[exercise.type] = [];
                }
                exerciseArr[exercise.type].push(new Exercise(exercise.id, exercise.name, exercise.type));
            });

            for (let key in exerciseArr) {
                let exerciseType: IExerciseType = <IExerciseType>{};

                exerciseType.name = key;
                exerciseType.exercises = exerciseArr[key];

                exercisesByType.push(exerciseType);
            }

            return exercisesByType;
        }


        /***
         * Opens and closes md-sidenav - Current workout
         */
        public toggleWorkout() {
            this.$sidenav('right').toggle();
        }


        /***
         * Adds/Removes exercise into the current workout
         * @param exercise
         */
        public toggleExerciseInCurrentWorkout(exercise: Exercise) {
            console.log(exercise);
            let alreadySelected = _.findWhere(this.$rootScope.selectedExerciseList, {name: exercise.name});

            if (alreadySelected) {
                this.$rootScope.selectedExerciseList = _.without(this.$rootScope.selectedExerciseList, _.findWhere(this.$rootScope.selectedExerciseList, {
                    name: exercise.name
                }));
            }
            else {
                this.$rootScope.selectedExerciseList.push(exercise);
            }
        }
    }
    angular.module('portal').controller('MainController', portal.MainController);
}
