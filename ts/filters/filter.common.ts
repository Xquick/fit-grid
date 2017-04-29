///<reference path="../ref.ts"/>


angular.module('portal')
    .filter('formatDate', function () {
        return function (dateInput: string): string {
            // console.log(dateInput);
            let formatedDate: string;

            let convertedDate: Date = stringToDate(dateInput,'dd.mm.yyyy','.');

            return formatedDate;
        }
    });


function stringToDate(_date,_format,_delimiter)
{
    let formatLowerCase=_format.toLowerCase();
    let formatItems=formatLowerCase.split(_delimiter);
    let dateItems=_date.split(_delimiter);
    let monthIndex=formatItems.indexOf("mm");
    let dayIndex=formatItems.indexOf("dd");
    let yearIndex=formatItems.indexOf("yyyy");
    let month=parseInt(dateItems[monthIndex]);
    month-=1;

    let formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
}