import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";

export default [...ApiErrors, ...WeatherSagas];
