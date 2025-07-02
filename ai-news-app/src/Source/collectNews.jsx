const collectNews = async (params = {}) => {
  if (localStorage.getItem('headlines') !== null) {
    return JSON.parse(localStorage.getItem('headlines'));
  }

  try {
    // Construct URL with parameters from the params object
    const url = new URL('http://localhost:3000/api/news');

    // Add all parameters from the params object to the URL
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(
      url.toString(),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    if (data.status === 'ok') {
      localStorage.setItem('headlines', JSON.stringify(data));
      return data;
    } else {
      console.log('Failed to fetch news');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

export default collectNews;
