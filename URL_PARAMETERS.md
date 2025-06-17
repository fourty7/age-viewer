# Adding URL Parameter Support to AGE Viewer

This document explains how to add URL parameter support for pre-filling database connection details.

## Implementation Plan

### 1. Modify ServerConnectFrame.jsx

Add URL parameter parsing to read connection details:

```javascript
// In ServerConnectFrame.jsx, add this at the beginning of the component:
const getURLParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    host: params.get('host') || '',
    port: params.get('port') || '',
    database: params.get('database') || '',
    user: params.get('user') || '',
    password: params.get('password') || '',
    graph: params.get('graph') || ''
  };
};

// Replace FormInitialValue with:
const urlParams = getURLParams();
const FormInitialValue = {
  database: urlParams.database,
  graph: urlParams.graph,
  host: urlParams.host,
  password: urlParams.password,
  port: urlParams.port ? parseInt(urlParams.port) : null,
  user: urlParams.user,
};
```

### 2. Add Auto-Connect Feature (Optional)

Add automatic connection if all required fields are provided:

```javascript
useEffect(() => {
  const params = getURLParams();
  if (params.host && params.port && params.database && params.user && params.password) {
    // Optionally auto-submit the form
    if (params.autoconnect === 'true') {
      // Trigger form submission
    }
  }
}, []);
```

## Usage Examples

### Basic URL with Connection Details
```
http://localhost:3000/?host=localhost&port=5455&database=postgresDB&user=postgresUser&password=postgresPW
```

### With Graph Name
```
http://localhost:3000/?host=localhost&port=5455&database=postgresDB&user=postgresUser&password=postgresPW&graph=my_graph
```

### With Auto-Connect (if implemented)
```
http://localhost:3000/?host=localhost&port=5455&database=postgresDB&user=postgresUser&password=postgresPW&autoconnect=true
```

## Security Considerations

⚠️ **WARNING**: Passing passwords in URLs is a security risk because:
1. URLs are logged in browser history
2. URLs may be logged by web servers
3. URLs can be shared accidentally
4. URLs are visible in the browser address bar

### Safer Alternatives

1. **Use a connection token instead of password**
   - Generate temporary tokens on the backend
   - Pass token in URL: `?token=abc123`

2. **Store connection profiles**
   - Save named connection profiles on backend
   - Reference by name: `?profile=dev-database`

3. **Use environment-based defaults**
   - Set defaults based on deployment environment
   - Only override specific fields via URL

## Implementation Files to Modify

1. `/frontend/src/components/frame/presentations/ServerConnectFrame.jsx` - Add URL parsing
2. `/frontend/src/features/database/DatabaseSlice.js` - Handle initial state from URL
3. `/frontend/src/App.jsx` - Could add React Router for better URL handling