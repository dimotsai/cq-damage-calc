import core from 'mathjs/core';

var math = core.create();

math.import(require('mathjs/lib/type/number'))
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/expression'));

const eval_ = math.eval;

math.eval = function(expr, scope) {
    const expr_ = expr.toString().replace(/%/g, '(percent)');
    const scope_ = Object.assign({}, scope, {percent: 0.01});
    return eval_.call(math, expr_, scope_);
};

export default math;
