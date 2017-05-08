///<reference path="../ref.ts"/>


module portal {
    'use strict';

    export interface ICacheService {
        exerciseListByTypes: portal.IExerciseType[];
        exerciseList: portal.Exercise[];
        exercise: portal.Exercise;
    }

    export class CacheService implements ICacheService {
        protected $dataService;

        exerciseListByTypes: portal.IExerciseType[];
        exerciseList: portal.Exercise[];
        exercise: portal.Exercise;

        static $inject = ['$dataService'];

        constructor($dataService) {
            this.$dataService = $dataService;

            this.cacheExerciseList().then(() => {
                this.cacheExerciseHistory(1);
            });
        }

        protected cacheExerciseList(): ng.IPromise<boolean> {
            return this.$dataService.loadExerciseList().then((exercises) => {
                this.exerciseList = [];
                _.each(exercises, (exercise: json.IExercise) => {
                    this.exerciseList.push(new Exercise(exercise));
                });
                this.exerciseListByTypes = [];

                this.exerciseListByTypes = this.sortExercisesByTypes(exercises);
            }).then(() => {
                return true;
            });
        }

        protected cacheExerciseHistory(user_id: number): void {
            this.$dataService.loadExerciseHistory(user_id).then((historyList: json.IWorkoutHistory[]) => {
                _.each(this.exerciseList, (exercise: Exercise) => {
                    _.each(historyList, (workoutHistory: json.IWorkoutHistory) => {
                        _.each(workoutHistory.schedule, (workoutSchedule: json.IWorkoutSchedule) => {
                            let scheduledExercise: json.IExerciseWithSchedule = _.find(workoutSchedule.exerciseList, {name: exercise.name});

                            if (scheduledExercise !== undefined) {
                                if (exercise.schedule === undefined) {
                                    console.log('updating', exercise);
                                    exercise.schedule = [];
                                }
                                exercise.schedule.push(<IExerciseSchedule>{
                                    date: workoutSchedule.date,
                                    setList: scheduledExercise.setList
                                });
                            }
                        });
                    });
                });

                console.log('this.exerciseList', this.exerciseList);

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
                exerciseArr[exercise.type].push(new Exercise(exercise));
            });

            for (let key in exerciseArr) {
                let exerciseType: IExerciseType = <IExerciseType>{};

                exerciseType.name = key;
                exerciseType.exerciseList = exerciseArr[key];

                exercisesByType.push(exerciseType);
            }

            return exercisesByType;
        }
    }
}

angular.module('portal').service('$cacheService', portal.CacheService);