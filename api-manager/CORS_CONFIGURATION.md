# CORS Configuration Guide for API Manager

This guide explains how to configure Cross-Origin Resource Sharing (CORS) in the API Manager to allow specific websites to access your API endpoints.

## Overview

The API Manager uses a centralized CORS configuration system that allows you to:

1. Specify which domains can access your API
2. Configure different permissions for different domains
3. Set special rules for development environments
4. Handle preflight requests automatically

## Configuration

### 1. Adding Allowed Domains

To allow a specific website to access your API, add it to the `allowedDomains` object in `src/app/lib/cors.js`:

```javascript
allowedDomains: {
  'https://your-frontend-domain.com': {
    methods: ['GET', 'POST'],
    allowCredentials: true,
    headers: ['Content-Type', 'Authorization']
  }
}
```

For each domain, you can configure:
- `methods`: HTTP methods allowed (e.g., GET, POST, PUT, DELETE)
- `allowCredentials`: Whether to allow credentials (cookies, authorization headers)
- `headers`: HTTP headers allowed in requests

### 2. Development Environment

For development, you can configure default settings that apply to all domains listed in the `development.domains` array:

```javascript
development: {
  domains: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
  allowCredentials: true
}
```

These settings will only be applied when `process.env.NODE_ENV === 'development'`.

## How It Works

The API Manager uses two main functions to handle CORS:

1. `applyCors(request, responseData, status)`: Applies CORS headers to regular API responses
2. `handleOptionsRequest(request)`: Handles OPTIONS preflight requests

These functions check the origin of the request against the allowed domains and apply the appropriate CORS headers.

## Adding a New API Route

When creating a new API route, make sure to:

1. Import the CORS utilities:
   ```javascript
   import { applyCors, handleOptionsRequest } from '../../lib/cors';
   ```

2. Add an OPTIONS handler for preflight requests:
   ```javascript
   export async function OPTIONS(request) {
     return handleOptionsRequest(request);
   }
   ```

3. Use the `applyCors` function for all responses:
   ```javascript
   export async function GET(request) {
     // Your API logic here
     return applyCors(request, { data: 'your response data' }, 200);
   }
   ```

## Testing CORS Configuration

To test if your CORS configuration is working correctly:

1. Make a request from your frontend to the API
2. Check the browser console for CORS errors
3. Verify that the appropriate CORS headers are being returned in the response

If you're getting CORS errors, make sure the domain making the request is included in the `allowedDomains` object or in the `development.domains` array if you're in development mode.

## Security Considerations

- Only add domains you trust to the `allowedDomains` object
- Be specific about which methods and headers you allow
- Consider setting `allowCredentials: false` for domains that don't need to send credentials
- Regularly review your CORS configuration to ensure it's still appropriate