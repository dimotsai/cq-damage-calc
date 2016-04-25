import core from 'mathjs/core';

var math = core.create();

math.import(require('mathjs/lib/type/number'))
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/expression/function/eval'));

export default math;
