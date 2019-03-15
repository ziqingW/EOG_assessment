import "isomorphic-fetch";

const findWeatherbyId = async id => {
  // Using the create-react-app's proxy for CORS issues
  const response = await fetch(
    `https://react-assessment-api.herokuapp.com/api/weather/location/${id}/`
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const json = await response.json();
  return { data: json };
};

export default findWeatherbyId;
