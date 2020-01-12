const createReservation = (passenger, flight) => {
  return {
    passengerInfo: passenger,
    flightInfo: flight
  };
};

export default createReservation;
