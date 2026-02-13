import type { APIRoute } from 'astro';

let result: Response | null = null;
const clearResult = () => {
  result = null;
};
const loadResult = async (): Promise<Response> => {
  const res = await fetch("https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/dev/result.json");
  result = new Response(await res.text());
  setTimeout(clearResult, 10000);
  return result.clone();
}

export const GET: APIRoute = () => result === null
  ? loadResult()
  : result.clone();
