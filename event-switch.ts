import {Rule, EventSwitchContext} from './event-switch.d.js';

export function addEventListeners(target: EventTarget, ctx: EventSwitchContext) : EventSwitchContext{
    for(const key in ctx.eventSwitch){
        const rule = ctx.eventSwitch[key];
        target.addEventListener(key, e =>{
            processRule(rule, e, ctx);
        })
    }
    return ctx;
}
function processRule(rule: Rule,  e: Event, ctx: EventSwitchContext){
    const target = e.target as HTMLElement;
    if(rule.action !== undefined){
        rule.action(e, ctx);
    }
    if(rule.route !== undefined){
        for(const matchRuleKey in rule.route){
            const matchRule = rule.route[matchRuleKey];
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