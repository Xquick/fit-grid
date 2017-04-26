/**
 * Created by amrazek on 21/03/16.
 */

/// <reference path="ref.ts" />

module portal {
    'use strict';

    export class IConfig {
        api: {
            url: string
        }
    }

    export var config: IConfig = {
        api: {
            url: 'http://fitness-grid.localhost/'
        }
    }
}