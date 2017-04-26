/// <reference path="../ref.ts" />

module portal {
    'use strict';

    export class GridController extends MainController {
        static $inject = ['$scope', '$DataService', '$mdDialog','$mdSidenav', '$translate'];
        public calendarDays: ICalendarDays[] = [];

        constructor($scope, $dataService, $mdDialog,$mdSidenav, $translate) {
            super($scope, $dataService, $mdDialog, $mdSidenav, $translate);
            this.getExercises();
            this.initHistoryDates();
        }

        public openExerciseDetailDialog($event, exerciseId) {
            this.$dataService.exercise = this.$dataService.getExerciseDetail(exerciseId);
            this.$dialog.show({
                templateUrl: 'templates/dialog/exercise-detail.html',
                preserveScope: true,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    this.status = 'You said the information was "' + answer + '".';
                }, function () {
                    this.status = 'You cancelled the dialog.';
                });
        }

        public cancel() {
            this.$dialog.cancel();
        }

        private initHistoryDates() {

            for (let i = 0; i < 5; i++) {
                let date: Date = new Date();

                date.setDate(date.getDate() - i);

                let dd = date.getDate();
                let mm = date.getMonth() + 1;
                let y = date.getFullYear();

                let calendarDay: ICalendarDays = <ICalendarDays>{};
                calendarDay.date =  dd + '.' + mm + '.' + y;
                calendarDay.weekday = date.getDay();
                calendarDay.abbreviation = "";
                this.calendarDays.push(calendarDay);
            }
        }
    }
    angular.module('portal').controller('GridController', portal.GridController);
}

