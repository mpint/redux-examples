const apiKey = "3a19a411cf83803bd844d7a8fd5f82f0";

export const getForecastForZipcodeRequest = async zip =>
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apiKey}`
  )
    .then(async response => {
      if (response.status !== 200) {
        throw new Error("bad zip");
      }

      return response;
    })
    .then(response => response.json());
