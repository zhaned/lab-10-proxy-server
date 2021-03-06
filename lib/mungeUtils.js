function formatLocation(data){
  return {
    formatted_query: data[0].display_name,
    latitude: data[0].lat,
    longitude: data[0].lon,
  };
}

function formatWeather(weatherData) {
  const formattedResponse = weatherData.data.map(weatherItem => {
    return {
      forecast: weatherItem.weather.description,
      time: new Date(weatherItem.ts * 1000).toLocaleDateString(),
    };
  });

  const Response = formattedResponse.slice(0, 7);
  return Response;
}

function formatReview(reviewData) {
  const formattedResponse = reviewData.businesses.map(reviewItem => {
    return {
      name: reviewItem.name,
      image_url: reviewItem.image_url,
      price: reviewItem.price,
      rating: reviewItem.rating,
      url: reviewItem.url
    };
  });

  const Response = formattedResponse.slice(0, 3);
  return Response;
}

module.exports = {
  formatLocation,
  formatWeather,
  formatReview
};