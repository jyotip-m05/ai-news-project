// Configuration for allowed websites
export const corsConfig = {
  // List of allowed domains with their specific permissions
  allowedDomains: {
    'http://localhost:5173': {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowCredentials: true,
      headers: ['Content-Type', 'Authorization']
    },
    'https://ai-news-app-sigma.vercel.app': {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowCredentials: true,
      headers: ['Content-Type', 'Authorization']
    },
    // Add your actual frontend domain here
    'https://your-frontend-domain.com': {
      methods: ['GET', 'POST'],
      allowCredentials: true,
      headers: ['Content-Type', 'Authorization']
    },
    // Development domains
    'http://localhost:3000': {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowCredentials: true,
      headers: ['Content-Type', 'Authorization']
    }
  },

  // Default values for development
  development: {
    domains: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization'],
    allowCredentials: true
  }
};

/**
 * Apply CORS headers to a response based on the request origin
 * @param {Request} request - The incoming request
 * @param responseData
 * @param status
 * @returns {Response} The modified response with appropriate CORS headers
 */
export function applyCors(request, responseData, status = 200) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin');
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Prepare headers for the response
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  // Check if the origin is allowed
  if (origin) {
    if (corsConfig.allowedDomains[origin]) {
      // Apply specific settings for this domain
      const domainConfig = corsConfig.allowedDomains[origin];

      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Access-Control-Allow-Methods', domainConfig.methods.join(', '));
      headers.set('Access-Control-Allow-Headers', domainConfig.headers.join(', '));

      if (domainConfig.allowCredentials) {
        headers.set('Access-Control-Allow-Credentials', 'true');
      }
    } else if (isDevelopment && corsConfig.development.domains.includes(origin)) {
      // Apply development settings
      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Access-Control-Allow-Methods', corsConfig.development.methods.join(', '));
      headers.set('Access-Control-Allow-Headers', corsConfig.development.headers.join(', '));

      if (corsConfig.development.allowCredentials) {
        headers.set('Access-Control-Allow-Credentials', 'true');
      }
    }
    // If origin is not allowed, no CORS headers will be set
  }

  // Create and return the response with CORS headers
  return new Response(JSON.stringify(responseData), {
    status: status,
    headers: headers,
  });
}

/**
 * Handle OPTIONS requests for CORS preflight
 * @param {Request} request - The incoming request
 * @returns {Response} A 204 No Content response with appropriate CORS headers
 */
export function handleOptionsRequest(request) {
  const origin = request.headers.get('origin');
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Prepare headers for the response
  const headers = new Headers();

  // Check if the origin is allowed
  if (origin) {
    if (corsConfig.allowedDomains[origin]) {
      // Apply specific settings for this domain
      const domainConfig = corsConfig.allowedDomains[origin];

      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Access-Control-Allow-Methods', domainConfig.methods.join(', '));
      headers.set('Access-Control-Allow-Headers', domainConfig.headers.join(', '));

      if (domainConfig.allowCredentials) {
        headers.set('Access-Control-Allow-Credentials', 'true');
      }
    } else if (isDevelopment && corsConfig.development.domains.includes(origin)) {
      // Apply development settings
      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Access-Control-Allow-Methods', corsConfig.development.methods.join(', '));
      headers.set('Access-Control-Allow-Headers', corsConfig.development.headers.join(', '));

      if (corsConfig.development.allowCredentials) {
        headers.set('Access-Control-Allow-Credentials', 'true');
      }
    }
  }

  // Return a 204 No Content response for preflight requests
  return new Response(null, {
    status: 204, // No Content
    headers: headers,
  });
}
