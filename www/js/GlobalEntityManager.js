define(["require", "exports", "components/EntityManager"], function (require, exports, EntityManager) {
    "use strict";
    var globalEntityManager = new EntityManager();
    return globalEntityManager;
});
