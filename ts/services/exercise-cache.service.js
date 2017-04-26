/**
 * Created by amrazek on 10/07/16.
 */
///<reference path="../ref.ts"/>
var portal;
(function (portal) {
    'use strict';
    var Advert = (function () {
        function Advert() {
        }
        Advert.prototype.construct = function (name) {
            this.name = name;
        };
        return Advert;
    }());
    portal.Advert = Advert;
})(portal || (portal = {}));
//# sourceMappingURL=advert-cache.service.js.map