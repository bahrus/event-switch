
export type EventHandler = (e: Event) => undefined | EventSwitchContext;

export type TestType = 'targetMatch' | 'propMatch';

export interface Test{
    type: TestType,
    expression: string,
}

type RuleMapping = {[key: string] : Rule};

export interface Rule extends Test{
    action: (e: Event, ctx: EventSwitchContext) => undefined | Rule,
    route: RuleMapping,
}

//export type EventRouter = EventHandler | string;

export interface EventSwitchContext{
    eventSwitch: RuleMapping;
}
export function addEventListeners(target: EventTarget, ctx: EventSwitchContext){
    for(var key in ctx){

    }
}