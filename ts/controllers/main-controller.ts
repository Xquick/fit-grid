///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export interface IFilter {
        northeastLat: string;
    }
    export interface IExtendedRootScope extends ng.IRootScopeService {
        currentExerciseList: ICurrentWorkoutExercise[];
        currentExerciseMap: boolean[];
    }

    export class MainController {
        public $cacheService: ICacheService;
        public $translate: translate.ITranslateProvider;
        public filter: IFilter;
        public $sidenav;
        public $dialog;
        public $rootScope: IExtendedRootScope;
        public $scope: ng.IScope;

        static $inject = ['$rootScope', '$scope', '$cacheService', '$mdDialog', '$mdSidenav', '$translate'];

        constructor($rootScope, $scope, $cacheService, $mdDialog, $mdSidenav, $translate) {
            this.$cacheService = $cacheService;
            this.$dialog = $mdDialog;
            this.$translate = $translate;
            this.$sidenav = $mdSidenav;
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$rootScope.currentExerciseList = [];
            this.$rootScope.currentExerciseMap = [];
        }

        public onDropExercise(index: number, type: string) {
            this.$rootScope.currentExerciseList.splice(index, 1);
            // this.$rootScope.currentExerciseList = this.retypeDroppedExercises(this.$rootScope.currentExerciseList);
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
            let selectedExerciseList = this.$rootScope.currentExerciseList;
            let exerciseExists = _.findWhere(selectedExerciseList, {name: exercise.name});

            if (!exerciseExists) {
                this.$rootScope.currentExerciseMap[exercise.id] = true;
                this.$rootScope.currentExerciseList.push({
                    id: exercise.id,
                    name: exercise.name,
                    type: exercise.type,
                    isSuperset: false
                });
            } else {
                this.$rootScope.currentExerciseMap[exercise.id] = false;
                _.remove(selectedExerciseList, {name: exercise.name});
            }
        }

        public toggleExerciseSuperset(exerciseId: number): void {
            let exerciseMatch: ICurrentWorkoutExercise = _.find(this.$rootScope.currentExerciseList, {id: exerciseId});

            if (exerciseMatch) {
                exerciseMatch.isSuperset = !exerciseMatch.isSuperset;
            }
        }

        public saveWorkout() {
            console.log('saving workout', this.$rootScope.currentExerciseList);
        }

        // //When item is dropped it changes from Exercise type to common Object - this is temp fix
        // private retypeDroppedExercises(exerciseList: ICurrentWorkoutExercise[]): ICurrentWorkoutExercise[] {
        //     let tmpArr: ICurrentWorkoutExercise[] = [];
        //
        //     _.each(exerciseList, exercise => {
        //         tmpArr.push({
        //             id: exercise.id,
        //             name: exercise.name,
        //             type: exercise.type,
        //             isSuperset: false
        //         });
        //     });
        //     _.extend(exerciseList, tmpArr);
        //
        //     return exerciseList;
        // }
    }
    angular.module('portal').controller('MainController', portal.MainController);
}
