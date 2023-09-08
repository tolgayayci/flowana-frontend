import axios from "axios";

export const fetcher = (url: string, protocol?: string) => 
  axios
    .get(process.env.NEXT_PUBLIC_API_URL + url, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}` },
      validateStatus: (status) => status !== 204 // Ignore 204 status
    })
    .then((res) => (res.status !== 204 ? res.data : undefined));
