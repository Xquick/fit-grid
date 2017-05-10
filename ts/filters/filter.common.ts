///<reference path="../ref.ts"/>


angular.module('portal')
    .filter('formatDate', function () {
        return function (dateInput: moment.Moment): string {
            // console.log(dateInput);
            let formatedDate: string;

            let today: moment.Moment = moment();

            let timeDiff = today.diff(dateInput, 'days');
            if (timeDiff < 1) {
                formatedDate = 'date.today';
            } else if (timeDiff < 2) {
                formatedDate = 'date.yesterday';
            } else {
                formatedDate = dateInput.format(portal.config.date.shortFormat);
            }
            return formatedDate;
        }
    });
