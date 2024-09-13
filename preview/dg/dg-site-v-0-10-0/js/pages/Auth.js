import { FormHandler } from "../Utils/FormHandler.js";
import authService from "../services/AuthService.js";
import { loginRules } from "../validationRules/loginRules.js";
import { registerRules } from "../validationRules/registerRules.js";


function handleLogin(data) {
    return authService.login(data.username, data.password);
}
function handleRegister(data) {
    return authService.register(data.regUsername, data.regPassword, data.confirmPassword, data.regEmail);
}

const loginFormHandler = new FormHandler('login-form', handleLogin, loginRules);
const registerFormHandle = new FormHandler('register-form', handleRegister, registerRules);