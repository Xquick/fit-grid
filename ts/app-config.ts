/// <reference path="ref.ts" />

module portal {
    'use strict';

    export class IConfig {
        api: {
            url: string
        };
        date: {
            shortFormat: string;
            mediumFormat: string;
            longFormat: string;
        };
    }

    export let config: IConfig = <IConfig>{
        api: {
            url: 'http://fit-grid-api.localhost/api/'
        },
        date: {
            shortFormat: 'D.M',
            mediumFormat: 'D.M.YY',
            longFormat: 'D.M.YYYY'
        }
    }
}
