export type EventHandler = (e?: Event, ctx?: EventContext) => void | EventContext | boolean | string | number;

export type TestType = 'targetMatch' | 'propMatch';

export interface Test{
    type?: TestType,
    expression?: string,
}

export type RuleMapping = {[key: string] : Rule | EventHandler};

export interface Rule extends Test{
    action?: (e?: Event, ctx?: EventContext) => void | Rule,
    route?: RuleMapping,
}


export interface EventContext{
    eventManager?: (target?: EventTarget, ctx?: EventContext) => EventContext;
    eventRules?: RuleMapping;
}