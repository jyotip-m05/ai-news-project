import fetch from 'node-fetch';
import { applyCors, corsConfig, handleOptionsRequest } from '../../lib/cors';

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request) {
  return handleOptionsRequest(request);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  // Check for API key
  if (!NEWS_API_KEY) {
    return applyCors(request, { error: 'News API key not configured.' }, 500);
  }

  // Get all possible parameters
  const endpoint = searchParams.get('endpoint') || 'everything'; // 'everything' or 'top-headlines'
  const params = {
    q: searchParams.get('query'),          // Search query
    country: searchParams.get('country'),   // 2-letter ISO 3166-1 country code
    category: searchParams.get('category'), // business, entertainment, general, health, science, sports, technology
    sources: searchParams.get('sources'),   // News sources to fetch from
    language: searchParams.get('language'), // 2-letter ISO-639-1 language code
    sortBy: searchParams.get('sortBy'),    // relevancy, popularity, publishedAt
    pageSize: searchParams.get('pageSize'), // Number of results to return per page (max 100)
    page: searchParams.get('page'),         // Article number
    from: searchParams.get('from'),         // Date and optional time in ISO 8601 format
    to: searchParams.get('to'),             // Date and optional time in ISO 8601 format
  };

  // Validate endpoint
  if (!['everything', 'top-headlines'].includes(endpoint)) {
    return applyCors(request, { error: 'Invalid endpoint. Use "everything" or "top-headlines".' }, 400);
  }

  // Validate required parameters based on endpoint
  if (endpoint === 'everything' && !params.q && !params.sources) {
    return applyCors(request, { error: 'For "everything" endpoint, either query or sources is required.' }, 400);
  }

  if (endpoint === 'top-headlines' && 0) {
    return applyCors(request, { error: 'For "top-headlines" endpoint, at least one of: query, country, category, or sources is required.' }, 400);
  }

  try {
    // Build the URL with query parameters
    const baseUrl = `https://newsapi.org/v2/${endpoint}`;
    const queryParams = new URLSearchParams();

    // Add all non-null parameters to the query
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    queryParams.append('apiKey', NEWS_API_KEY);

    const url = `${baseUrl}?${queryParams.toString()}`;
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return applyCors(request, data, 200);
    } else {
      return applyCors(request, { error: data.message || 'Error fetching news.' }, response.status);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    return applyCors(request, { error: 'Internal Server Error' }, 500);
  }
}
