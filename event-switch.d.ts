export type EventHandler = (e: Event) => undefined | EventSwitchContext;

export type TestType = 'targetMatch' | 'propMatch';

export interface Test{
    type: TestType,
    expression: string,
}

type RuleMapping = {[key: string] : Rule};

export interface Rule extends Test{
    action?: (e: Event, ctx: EventSwitchContext) => undefined | Rule,
    route?: RuleMapping,
}


export interface EventSwitchContext{
    addEventListeners?: (target: EventTarget, ctx: EventSwitchContext) => EventSwitchContext;
    eventSwitch?: RuleMapping;
}