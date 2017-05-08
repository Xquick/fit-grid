///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export interface IFilter {
        northeastLat: string;
    }
    export interface IExtendedRootScope extends ng.IRootScopeService {
        currentExerciseList: IExerciseType[];
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
            this.$rootScope.currentExerciseList = [];

            this.loadExercises().then(() => {
                this.loadExercisesHistory(1);
            });
        }

        public onDropExercise(index: number, type: string) {
            let currentTypeExerciseList = _.findWhere(this.$rootScope.currentExerciseList, {name: type});

            currentTypeExerciseList.exerciseList.splice(index, 1);
            currentTypeExerciseList.exerciseList = this.retypeDroppedExercises(currentTypeExerciseList.exerciseList);
        }

        public onDropType(index) {
            this.$rootScope.currentExerciseList.splice(index, 1);

            _.each(this.$rootScope.currentExerciseList, (type: IExerciseType) => {
                type.exerciseList = this.retypeDroppedExercises(type.exerciseList);
            });
            console.log(this.$rootScope.currentExerciseList);

        }

        protected loadExercises(): ng.IPromise<boolean> {
            return this.$dataService.loadExercises().then((exercises) => {
                console.log('exercises', exercises);
                this.$dataService.exerciseList = exercises;
                this.$dataService.exerciseListByTypes = [];

                this.$dataService.exerciseListByTypes = this.sortExercisesByTypes(exercises);
            }).then(() => {
                return true;
            });
        }


        protected loadExercisesHistory(user_id: number): void {
            this.$dataService.loadExerciseHistory(user_id).then((history) => {
                console.log(history);
            });
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
            let typeExists = _.findWhere(selectedExerciseList, {name: exercise.type});

            if (!typeExists) {
                this.$rootScope.currentExerciseList.push(<IExerciseType>{
                    name: exercise.type,
                    exerciseList: [exercise]
                });
            } else {
                let selectedType: IExerciseType = _.findWhere(selectedExerciseList, {name: exercise.type});

                let exerciseExists = _.findWhere(selectedType.exerciseList, {name: exercise.name});
                if (!exerciseExists) {
                    let newExerciseList = selectedType.exerciseList.push(exercise);
                    _.extend(selectedType.exerciseList, newExerciseList);
                } else {
                    _.remove(selectedType.exerciseList, {name: exercise.name});

                    //If the type (e.g. "back, chest") has no exercises left, delete it also
                    if (selectedType.exerciseList.length === 0) {
                        _.remove(this.$rootScope.currentExerciseList, {name: selectedType.name});
                    }
                }
            }
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
                exerciseType.exerciseList = exerciseArr[key];

                exercisesByType.push(exerciseType);
            }

            return exercisesByType;
        }


        //Todo: When item is dropped it changes from Exercise type to common Object - this is temp fix
        private retypeDroppedExercises(exerciseList: Exercise[]): Exercise[] {
            let tmpArr: Exercise[] = [];

            _.each(exerciseList, item => {
                tmpArr.push(new Exercise(item['_id'], item['_name'], item['_type']));
            });
            _.extend(exerciseList, tmpArr);

            return exerciseList;
        }
    }
    angular.module('portal').controller('MainController', portal.MainController);
}
