const DiContainer = function() {
  // 반드시 생성자로 객체를 생성하게 한다.
  if (!(this instanceof DiContainer)) {
    return new DiContainer();
  }
  this.registrations = [];
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
  this.registrations[name] = { dependencies: dependencies, func: func };
};

DiContainer.prototype.get = function(name) {
  const self = this,
    registration = this.registrations[name],
    dependencies = [];
  if (registration === undefined) {
    return undefined;
  }

  registration.dependencies.forEach(dependencyName => {
    const dependency = self.get(dependencyName);
    dependencies.push(dependency === undefined ? undefined : dependency);
  });

  return registration.func.apply(undefined, dependencies);
};

export default DiContainer;
