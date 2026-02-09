import type { APIRoute } from 'astro';

let result: Response | null = null;
const clearResult = () => {
  result = null;
};
const loadResult = async (res: Response): Promise<Response> => {
  result = new Response(await res.text());
  setTimeout(clearResult, 5000);
  return result.clone();
}

export const GET: APIRoute = () => result === null
  ? fetch("https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/dev/result.json").then(loadResult)
  : result.clone()
