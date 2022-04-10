export const BASE_API = "http://127.0.0.1:8000"
export const API_LOGIN = `${BASE_API}/api/auth/login`
export const API_REGISTER = `${BASE_API}/api/auth/register`
export const API_LOGOUT = `${BASE_API}/api/auth/logout`

// API Showtime 
export const API_SHOWTIME = `${BASE_API}/api/showtime`

// API Seat
export const API_SEAT_IN_ROOM = `${BASE_API}/api/seat/in_room/:id`

//API Payment
export const API_ORDER_SEAT = `${BASE_API}/api/tickets/order`
export const API_PAY_SEAT = `${BASE_API}/api/tickets/pay`
export const API_DELETE_SEAT = `${BASE_API}/api/tickets/delete`