import DiContainer from "./DiContainer";

describe("DiContainer", function() {
  let container;
  beforeEach(function() {
    container = new DiContainer();
  });
  describe("register(name, dependencies, func)", () => {
    // 01
    it("인자가 하나라도 빠졌거나 타입이 잘못되면 예외를 던진다", () => {
      const badArgs = [
        // 인자가 아예 없는 경우
        [],
        // name만 있는경우
        ["Name"],
        // name과 dependencies만 있는 경우
        ["Name", ["Dependency1", "Dependency2"]],
        // dependencies가 빠진 경우
        // (상용 프레임워크는 지원하지만, DiContainer는 지원하지 않음)
        ["Name", () => {}],
        // 타입이 잘못된 다양한 사례들
        [1, ["a", "b"], () => {}],
        ["Name", [1, 2], () => {}],
        ["Name", ["a", "b"], "should be a function"]
      ];
      badArgs.forEach(args => {
        expect(() => {
          container.register.apply(container, args);
        }).toThrowError(container.messages.registerRequiresArgs);
      });
    });
  });

  describe("get(name)", () => {
    it("성명이 등록되어 있지 않으면 undefined를 반환한다.", () => {
      expect(container.get("notDefined")).toBeUndefined();
    });

    it("등록된 함수를 실행한 결과를 반환한다", () => {
      const name = "MyName",
        returnFromRegisteredFunction = "something";
      container.register(name, [], function() {
        return returnFromRegisteredFunction;
      });
      expect(container.get(name)).toBe(returnFromRegisteredFunction);
    });

    it("등록된 함수에 의존성을 제공한다.", () => {
      let main = "main",
        mainFunc,
        dep1 = "dep1",
        dep2 = "dep2";

      container.register(main, [dep1, dep2], (dep1Func, dep2Func) => {
        return () => {
          return dep1Func() + dep2Func();
        };
      });

      container.register(dep1, [], () => {
        return () => {
          return 1;
        };
      });

      container.register(dep2, [], () => {
        return () => {
          return 2;
        };
      });

      mainFunc = container.get(main);
      expect(mainFunc()).toBe(3);
    });
  });
});
