let inflightTokenRequest: Promise<string> | null = null;

export async function fetchCsrfToken(): Promise<string> {
  if (inflightTokenRequest) {
    return inflightTokenRequest;
  }

  inflightTokenRequest = (async () => {
    const response = await fetch("/api/csrf", {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Unable to initialize secure form.");
    }

    const payload = (await response.json()) as { token?: string };

    if (!payload.token) {
      throw new Error("Unable to initialize secure form.");
    }

    return payload.token;
  })();

  try {
    return await inflightTokenRequest;
  } finally {
    inflightTokenRequest = null;
  }
}
