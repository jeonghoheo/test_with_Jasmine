import createReservation from "./TestFrameworks_01";

describe(`createReservation(passenger, flight)`, () => {
  let testPassenger = null,
    testFlight = null,
    testReservation = null;
  beforeEach(() => {
    testPassenger = {
      firstName: "윤지",
      lastName: "김"
    };

    testFlight = {
      number: "3443",
      carrier: "대한항공",
      destination: "울산"
    };

    testReservation = createReservation(testPassenger, testFlight);
  });
  it("passenger를 passengerInfo 프로퍼티에 할당한다.", () => {
    expect(testReservation.passengerInfo).toBe(testPassenger);
  });

  it("flightf를 flightInfo 프로퍼티에 할당한다.", () => {
    expect(testReservation.flightInfo).toBe(testFlight);
  });
});
