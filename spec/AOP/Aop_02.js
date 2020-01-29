const Aop = {
  around: function(fnName, advice, fnObj) {
    const originalFn = fnObj[fnName];
    fnObj[fnName] = () => {
      const targetContext = {};
      advice.call(targetContext, { fn: originalFn });
    };
  }
};

export default Aop;
