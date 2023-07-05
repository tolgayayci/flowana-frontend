import axios from "axios";

export const fetcher = (url: string) => axios.get(process.env.NEXT_PUBLIC_API_URL + url, {headers : {Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`}}).then(res => res.data);
