interface Body {
  query: string;
}

export const server = {
  fetch: async <TData = any>(body: Body) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });

    return (await res.json()) as Promise<{ data: TData }>;
  },
};
