const container = document.querySelector('.container'),
  seats = document.querySelectorAll('.row .seat:not(.occupied)'),
  count = document.querySelector('#count'),
  total = document.querySelector('#total'),
  movieSelect = document.querySelector('#movie')

let ticketPrice = +movieSelect.value

// save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

const setSeatData = selectedSeats => {
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

// update paragraph element to display price and seats
const updatedSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const numOfSelectedSeats = selectedSeats.length

  setSeatData(selectedSeats)

  count.textContent = numOfSelectedSeats
  total.textContent = numOfSelectedSeats * ticketPrice
}

const retrieveDataFromStorage = (
  seatStorage,
  movieIndexStorage,
  moviePriceStorage
) => {
  if (seatStorage) {
    seats.forEach((seat, index) => {
      if (seatStorage.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  if (movieIndexStorage) {
    movieSelect.selectedIndex = movieIndexStorage
    ticketPrice = moviePriceStorage
  }
}

// get data from local storage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice')

  retrieveDataFromStorage(selectedSeats, selectedMovieIndex, selectedMoviePrice)
}

// Movie change event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, ticketPrice)
  updatedSelectedCount()
})

// seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')

    updatedSelectedCount()
  }
})

// populate storage and corresponding elements
populateUI()
updatedSelectedCount()
