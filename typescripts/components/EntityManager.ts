/// <reference path="../definitions/require.d.ts" />
/// <reference path="EntityManager.d.ts" />

import "entity-manager"  // load this path on define()

var entityManager: EntityManager = require("entity-manager");

export = entityManager;
