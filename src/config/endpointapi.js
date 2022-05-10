export const BASE_API = "http://127.0.0.1:8000"
export const API_LOGIN = `${BASE_API}/api/auth/login`
export const API_REGISTER = `${BASE_API}/api/auth/register`
export const API_LOGOUT = `${BASE_API}/api/auth/logout`
export const API_USER_PROFILE =`${BASE_API}/api/auth/user-profile`

// API Showtime 
export const API_SHOWTIME = `${BASE_API}/api/showtime`
export const API_SHOWTIME_TIME = `${BASE_API}/api/showtime/gettime`
export const API_SHOWTIME_DETAIL= `${BASE_API}/api/showtime/:id`

// API Seat
export const API_SEAT_IN_ROOM = `${BASE_API}/api/seat/in_room/:id`

//API Payment
export const API_TICKET = `${BASE_API}/api/tickets`
export const API_ORDER_SEAT = `${BASE_API}/api/tickets/order`
export const API_PAY_SEAT = `${BASE_API}/api/tickets/pay`
export const API_DELETE_SEAT = `${BASE_API}/api/tickets/delete`
export const API_TICKET_USER_ID = `${BASE_API}/api/tickets/ticket_user_id`

//API Movie
export const API_MOVIE = `${BASE_API}/api/movies`
export const API_MOVIES_DETAIL = `${BASE_API}/api/movies/:id`

//API Banner
export const API_BANNER =`${BASE_API}/api/advertise`

//API News
export const API_NEWS =`${BASE_API}/api/news`

//API Evaluation
export const API_EVALUATION = `${BASE_API}/api/evaluation`
export const API_EVALUATION_STORE = `${BASE_API}/api/evaluation/store`
export const API_EVALUATION_DELETE = `${BASE_API}/api/evaluation/delete/:id`
 
//API opinion
export const API_OPINION_CREATE =`${BASE_API}/api/opinion/store`


