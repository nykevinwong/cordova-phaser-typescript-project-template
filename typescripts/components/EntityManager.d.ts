
declare module "entityManager" {
    export = EntityManager;
}

declare module EntityManager
{
    interface Processor
    {
        update(deltaTime: number): void;
    }

}

declare class EntityManager {

    constructor();
    getUid(): number;
    createEntity(componentIds: string[]): number;
    removeEntity(id:string): EntityManager;
    addComponent(id, component: any): EntityManager; 
    removeComponent(id:string): EntityManager;
    getComponentsList():string[];
    addComponentsToEntity(componentIds: string[], entityId:number) : EntityManager;
    removeComponentsFromEntity(componentIds: string[], entityId:number) : EntityManager;
    getComponentDataForEntity(componentId: string, entityId: number): any; 
    updateComponentDataForEntity(componentId: string, entityId: number, newState: any): EntityManager;
    getComponentsData(componentId:string) : any[]; 
    entityHasComponent(entityId:number, componentId:string): boolean;
    addAssemblage(id: string, assemblage: any): EntityManager;
    removeAssemblage(id: string);
    createEntityFromAssemblage(assemblageId:string) : number;
    addProcessor(processor: EntityManager.Processor): EntityManager; 
    removeProcessor (processor: EntityManager.Processor): EntityManager; 
    update(deltaTime: number): EntityManager;
} 


