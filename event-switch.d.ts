export type EventHandler = (e?: Event, ctx?: EventSwitchContext) => void | EventSwitchContext;

export type TestType = 'targetMatch' | 'propMatch';

export interface Test{
    type?: TestType,
    expression?: string,
}

type RuleMapping = {[key: string] : Rule | EventHandler};

export interface Rule extends Test{
    action?: (e?: Event, ctx?: EventSwitchContext) => void | Rule,
    route?: RuleMapping,
}


export interface EventSwitchContext{
    eventManager?: (target?: EventTarget, ctx?: EventSwitchContext) => EventSwitchContext;
    eventRules?: RuleMapping;
}