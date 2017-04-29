///<reference path="../ref.ts"/>

module portal {
    'use strict';

    export interface IFilter {
        northeastLat: string;
    }
    export interface IExtendedRootScope extends ng.IRootScopeService {
        selectedExerciseList: Exercise[];
        selectedExerciseTypeList: string[];
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
            this.$rootScope.selectedExerciseTypeList = [];

            this.loadExercises();
        }

        public onDropExercise(index: number) {
            let tmpArr: Exercise[] = [];
            this.$rootScope.selectedExerciseList.splice(index, 1);
            //Todo: When item is dropped it changes from Exercise type to common Object - this is temp fix
            this.$rootScope.selectedExerciseList.forEach(item => {
                tmpArr.push(new Exercise(item['_id'], item['_name'], item['_type']));
            });
            this.$rootScope.selectedExerciseList = tmpArr;
        }

        protected loadExercises(): void {
            this.$dataService.loadExercisesJson().then((exercises) => {
                this.$dataService.exerciseList = exercises;
                this.$dataService.exerciseListByTypes = [];

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
            let alreadySelected = _.findWhere(this.$rootScope.selectedExerciseList, {name: exercise.name});

            if (alreadySelected) {
                this.$rootScope.selectedExerciseList = _.without(this.$rootScope.selectedExerciseList, _.findWhere(this.$rootScope.selectedExerciseList, {
                    name: exercise.name
                }));
            }
            else {
                this.$rootScope.selectedExerciseList.push(exercise);

                if(this.$rootScope.selectedExerciseTypeList.indexOf(exercise.type) ===-1){
                    this.$rootScope.selectedExerciseTypeList.push(exercise.type);
                }
            }

            console.log( this.$rootScope.selectedExerciseTypeList);
        }
    }
    angular.module('portal').controller('MainController', portal.MainController);
}
