/// <reference path="../ref.ts" />

module portal {
    'use strict';

    export class GridController extends MainController {
        public calendarDays: ICalendarDays[] = [];

        static $inject = ['$rootScope', '$scope', '$cacheService', '$dataService', '$mdDialog', '$mdSidenav', '$translate'];

        constructor($rootScope: IExtendedRootScope,
                    $scope: ng.IScope,
                    $cacheService: ICacheService,
                    $dataService: IDataService,
                    $mdDialog: ng.material.IDialogService,
                    $mdSidenav: ng.material.ISidenavService,
                    $translate: ng.translate.ITranslateProvider) {
            super($rootScope, $scope, $cacheService, $dataService, $mdDialog, $mdSidenav, $translate);
            this.initHistoryDates();
        }

        public openExerciseDetailDialog($event:ng.IAngularEvent, exerciseId: number) {
            // this.$dataService.exercise = this.$dataService.getExerciseDetail(exerciseId);
            this.$dialog.show({
                templateUrl: 'templates/dialog/exercise-detail.html',
                preserveScope: true,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    // this.status = 'You said the information was "' + answer + '".';
                }, function () {
                    // this.status = 'You cancelled the dialog.';
                });
        }

        public cancel() {
            this.$dialog.cancel();
        }

        public didExerciseOccurreOnThisDay(exercise: Exercise, day: ICalendarDays): boolean {
            let occurred = false;
            if (exercise.hasOwnProperty('schedule')) {
                _.each(exercise.schedule, (scheduleItem: IExerciseSchedule) => {
                    if (moment(day.date.format(portal.config.date.mediumFormat)).isSame(moment(scheduleItem.date.format(portal.config.date.mediumFormat)))) {
                        occurred = true;
                    }
                });

                return occurred;
            } else {
                return false;
            }
        }

        private initHistoryDates() {
            for (let i = 0; i < 10; i++) {
                let date: moment.Moment = moment();

                date = date.subtract(i, 'days');

                let calendarDay: ICalendarDays = <ICalendarDays>{};
                calendarDay.date = date;
                calendarDay.weekday = date.day();
                calendarDay.abbreviation = "";
                this.calendarDays.push(calendarDay);
            }
        }

    }
    angular.module('portal').controller('GridController', portal.GridController);
}

