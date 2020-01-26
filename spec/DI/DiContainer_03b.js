const DiContainer = function() {
  // 반드시 생성자로 객체를 생성하게 한다.
  if (!(this instanceof DiContainer)) {
    return new DiContainer();
  }
  this.registerations = [];
};

DiContainer.prototype.messages = {
  registerRequiresArgs:
    "이 생성자 함수는 인자가 3개 있어야 합니다: " + "문자열, 문자열배열, 함수."
};

DiContainer.prototype.register = function(name, dependencies, func) {
  let ix;

  if (
    typeof name !== "string" ||
    !Array.isArray(dependencies) ||
    typeof func !== "function"
  ) {
    console.log(`[Jeongho][Line - 21][File - Dicontainer__01.js] 
          ${this.messages.registerRequiresArgs}
          `);
    throw new Error(this.messages.registerRequiresArgs);
  }

  for (ix = 0; ix < dependencies.length; ++ix) {
    if (typeof dependencies[ix] !== "string") {
      console.log(`[Jeongho][Line - 29][File - Dicontainer__01.js] 
              ${this.messages.registerRequiresArgs}
              `);
      throw new Error(this.messages.registerRequiresArgs);
    }
  }
  this.registerations[name] = { func: func };
};

DiContainer.prototype.get = function(name) {
  const registeration = this.registerations[name];
  if (registeration === undefined) {
    return undefined;
  }
  return this.registerations[name].func();
};

export default DiContainer;
