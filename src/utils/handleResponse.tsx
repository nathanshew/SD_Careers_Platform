export const handleResponse = async (response: Response) => {
    if (!response.ok) {
      // Try parsing JSON error; fallback to status text if it fails
      const errorMessage = (await response.json().catch(() => null))?.error || 
                           `${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return response.json(); // Return the parsed JSON response
  };