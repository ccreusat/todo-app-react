export default function useFetch(baseURL: string) {
  function get(url: string) {
    return fetch(`${baseURL}/${url}?meta=false`, {
      headers: {
        "X-Master-Key":
          "$2b$10$RT/4WxZHLzdFey6NmbCKIOGqhNlCOyduT6skYsZzjec.DKGMkE8Qq",
      },
    })
      .then(res => res.json())
      .then(data => data);
  }

  function post(url: string, body: any) {
    return fetch(`${baseURL}/${url}`, {
      method: "put",
      headers: {
        "X-Master-Key":
          "$2b$10$RT/4WxZHLzdFey6NmbCKIOGqhNlCOyduT6skYsZzjec.DKGMkE8Qq",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => data);
  }

  return { get, post };
}
