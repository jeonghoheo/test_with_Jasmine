const Aop = {
  around: function(fnName, advice, fnObj) {
    fnObj[fnName] = advice;
  }
};

export default Aop;
