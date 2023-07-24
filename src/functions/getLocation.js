
async function getCityFromCoordinates(latitude, longitude) {
  try {
    const apiKey = "pk.056a81d6429efd60cd6c543d0ed30415";
    const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`);

    if (!response.ok) {
      throw new Error("Failed to fetch city data from the API.");
    }

    const data = await response.json();


    const city = data.address.country || "City not fetched";

    return city;
  } catch (error) {

    return "Error fetching city data.";
  }
}

const getLocation = ({ setLocation, setLoading, setError }) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
     async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

     
        const city = await getCityFromCoordinates(latitude, longitude);
         
          setLocation({ latitude, longitude, city });
          setLoading(false);
      


      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  } else {
    setError("Geolocation is not supported by your browser.");
    setLoading(false);
  }
}
export default getLocation