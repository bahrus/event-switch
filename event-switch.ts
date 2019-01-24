import {Rule, EventSwitchContext, EventHandler} from './event-switch.d.js';

export function addEventListeners(target: EventTarget, ctx: EventSwitchContext) : EventSwitchContext{
    for(const key in ctx.eventSwitch){
        const rule = ctx.eventSwitch[key];
        target.addEventListener(key, e =>{
            processRule(rule, e, ctx);
        })
    }
    return ctx;
}
function processRule(ruleOrHandler: Rule | EventHandler,  e: Event, ctx: EventSwitchContext){
    const target = e.target as HTMLElement;
    if(typeof ruleOrHandler === 'function'){
        ruleOrHandler(e, ctx);
        return;//TODO, deal with return object?
    }
    if(ruleOrHandler.action !== undefined){
        ruleOrHandler.action(e, ctx);
    }
    if(ruleOrHandler.route !== undefined){
        for(const matchRuleKey in ruleOrHandler.route){
            const matchRule = ruleOrHandler.route[matchRuleKey];
            if(typeof matchRule === 'function'){
                matchRule(e, ctx);
                continue;
            }
            if(!matchRule.type) matchRule.type = 'targetMatch';
            switch(matchRule.type){
                case 'targetMatch':
                    if(target.matches && target.matches(matchRuleKey)){
                        processRule(matchRule, e, ctx);
                    }
                    break;
                case 'propMatch':
                    const propTokens = matchRule.expression!.split('.');
                    let val = e as any;
                    propTokens.forEach(token =>{
                        if(val) val = val[token];
                    })
                    if(val && val === matchRuleKey){
                        processRule(matchRule, e, ctx);
                    }
                    break; 
            }
        }
    }
}