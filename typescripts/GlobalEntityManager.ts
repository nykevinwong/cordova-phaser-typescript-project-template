/// <reference path="components/EntityManager.d.ts" />
import EntityManager=  require("components/EntityManager");

var globalEntityManager: EntityManager = new EntityManager();
export = globalEntityManager;
