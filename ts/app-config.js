/**
 * Created by amrazek on 21/03/16.
 */
/// <reference path="ref.ts" />
var portal;
(function (portal) {
    'use strict';
    var IConfig = (function () {
        function IConfig() {
        }
        return IConfig;
    }());
    portal.IConfig = IConfig;
    portal.config = {
        api: {
            url: 'http://roomsharing-api.localhost/'
        }
    };
})(portal || (portal = {}));
//# sourceMappingURL=app-config.js.map