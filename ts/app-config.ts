
/// <reference path="ref.ts" />

module portal {
    'use strict';

    export class IConfig {
        api: {
            url: string
        }
    }

    export let config: IConfig = {
        api: {
            url: 'http://fit-grid-api.localhost/api/'
        }
    }
}