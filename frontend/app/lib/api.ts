export function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    return `http://${window.location.hostname}:8000`;
  }

  return "http://localhost:8000";
}

export async function ensureCsrfToken() {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/csrf/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to establish a secure session.");
  }

  const data = (await response.json().catch(() => null)) as { csrfToken?: string } | null;
  if (!data?.csrfToken) {
    throw new Error("Missing CSRF token.");
  }

  return data.csrfToken;
}
