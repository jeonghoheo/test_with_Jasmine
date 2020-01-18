export const createReservation = (passenger, flight, saver) => {
  const reservation = {
    passengerInformation: passenger,
    flightInformation: flight
  };

  saver.saveReservation(reservation);
  return reservation;
};

export function ReservationSaver() {
  this.saveReservation = function(reservation) {
    // 예약 정보를 저장하는 웹 서비스와 연동하는 복잡한 코드가 안에 들어있다.
  };
}
