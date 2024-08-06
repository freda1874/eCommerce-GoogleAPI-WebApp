const APIkey = "55e23d8bf8da4c8db1b74a25abf4469b";

const LocationGetter = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocationInfo(latitude, longitude)
            .then((addy) => {
              resolve({ latitude, longitude, addy });
            })
            .catch((error) => {
              reject(error);
            });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const getLocationInfo = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          const { city, state, country } = getAddressComponents(data.results[0]);
          resolve(`${city || "Ottawa"}, ${state || "Ontario"} ${country || "Canada"}`);
        } else {
          reject(new Error("Reverse geolocation request failed."));
        }
      })
      .catch((error) => reject(error));
  });
};

const getAddressComponents = (result) => {
  let city, state, country;
  if (result && result.address_components) {
    result.address_components.forEach((component) => {
      if (component.types.includes("locality")) city = component.long_name;
      if (component.types.includes("administrative_area_level_1")) state = component.long_name;
      if (component.types.includes("country")) country = component.long_name;
    });
  }
  return { city, state, country };
};

export default LocationGetter;
