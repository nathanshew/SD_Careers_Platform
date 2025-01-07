{/*NOTE: Only can be used inside an useEffect hook*/}
export default function getCookie(name: string): string | null {

  if (typeof document === "undefined") {
    return null; // Return null during Server Side Rendering (SSR)
  }

  const cookies = document.cookie.split("; "); // Split cookies into key-value pairs
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("="); // Split each pair into key and value
    if (key === name) {
      return decodeURIComponent(value); // Return decoded value
    }
  }
  return null; // Return null if not found
}
