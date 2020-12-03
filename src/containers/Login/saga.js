import { LOGIN_REQUEST } from './types.js';
import { loginSuccess, loginError } from './actions.js';
import { put, take, call } from 'redux-saga/effects';
import {redirect} from '../../components/CustomRedirect/actions';
/** Call authorizeUser with username and password */
export default function* loginSaga(api) {
  // sagata slusha za actioni (ne zabravqi che vsichki sagi se izpulnqvat pri puskane na apa)
  while (true) {
    const loginRequest = yield take(LOGIN_REQUEST);
    if (loginRequest.payload) {
      const { username, password } = loginRequest.payload;
      // fist argument is function , other arguments are the values that i am going to use in that function
      yield call(authorizeUser, api, username, password);
    }
  }
}

/** Create login request
 * @param {object} api - 
 * @param {string} username - Username of the user
 * @param {any} password - Password of the user
 */
function* authorizeUser(api, username, password) {
  var response;
  try {
    response = yield call(api.login, username, password);
    const { jwtToken } = response.data;
    const successResponse = response.data.user
    console.log('responce saga Login', response);
    yield put(loginSuccess(successResponse.username, successResponse.id ,jwtToken, successResponse.firstName, successResponse.lastName));
    yield put(redirect('/cars'));
  } catch (error) {
    yield put(loginError(error));
  }
}
