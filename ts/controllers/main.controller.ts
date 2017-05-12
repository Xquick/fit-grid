///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export interface IFilter {
        northeastLat: string;
    }

    export interface ICurrentWorkout {
        date: moment.Moment;
        name: string;
        exerciseList: ICurrentWorkoutExercise[];
        exerciseMap: boolean[];
    }

    export interface IExtendedRootScope extends ng.IRootScopeService {
        currentWorkout: ICurrentWorkout;
    }

    export class MainController {
        public $cacheService: ICacheService;
        public $dataService: IDataService;
        public $translate: angular.translate.ITranslateProvider;
        public filter: IFilter;
        public $sidenav: angular.material.ISidenavService;
        public $dialog: angular.material.IDialogService;
        public $rootScope: IExtendedRootScope;
        public $scope: ng.IScope;

        public workoutDate: Date;

        static $inject = ['$rootScope', '$scope', '$cacheService', '$dataService', '$mdDialog', '$mdSidenav', '$translate'];

        constructor($rootScope: IExtendedRootScope,
                    $scope: ng.IScope,
                    $cacheService: ICacheService,
                    $dataService: IDataService,
                    $mdDialog: angular.material.IDialogService,
                    $mdSidenav: angular.material.ISidenavService,
                    $translate: angular.translate.ITranslateProvider) {
            this.$cacheService = $cacheService;
            this.$dataService = $dataService;
            this.$dialog = $mdDialog;
            this.$translate = $translate;
            this.$sidenav = $mdSidenav;
            this.$rootScope = $rootScope;
            this.$scope = $scope;

            this.initCurrentWorkout();
        }

        public onDropExercise(index: number, type: string) {
            this.$rootScope.currentWorkout.exerciseList.splice(index, 1);
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
            let selectedExerciseList: ICurrentWorkoutExercise[] = this.$rootScope.currentWorkout.exerciseList;
            let exerciseExists = _.find(selectedExerciseList, {name: exercise.name});

            if (!exerciseExists) {
                this.$rootScope.currentWorkout.exerciseMap[exercise.id] = true;
                this.$rootScope.currentWorkout.exerciseList.push({
                    id: exercise.id,
                    name: exercise.name,
                    type: exercise.type,
                    isSuperset: false
                });
            } else {
                this.$rootScope.currentWorkout.exerciseMap[exercise.id] = false;
                this.$rootScope.currentWorkout.exerciseList = <ICurrentWorkoutExercise[]>_.without(selectedExerciseList, _.findWhere(selectedExerciseList, {id: exercise.id}));
            }
        }

        public toggleExerciseSuperset(exerciseId: number): void {
            let exerciseMatch = _.find(this.$rootScope.currentWorkout.exerciseList, {id: exerciseId});

            if (exerciseMatch) {
                exerciseMatch.isSuperset = !exerciseMatch.isSuperset;
            }
        }

        public saveWorkout() {
            this.$rootScope.currentWorkout.date = moment.unix(this.workoutDate.getTime() / 1000);
            this.$dataService.persistWorkout(this.$rootScope.currentWorkout);
            this.$cacheService.updateCacheExerciseHistory(this.$rootScope.currentWorkout);
            this.initCurrentWorkout();
        }

        private initCurrentWorkout() {
            this.$rootScope.currentWorkout = <ICurrentWorkout>{};
            this.$rootScope.currentWorkout.exerciseList = [];
            this.$rootScope.currentWorkout.exerciseMap = [];
        }
    }
    angular.module('portal').controller('MainController', portal.MainController);
}
