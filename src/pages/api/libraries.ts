import type { APIRoute } from 'astro';

let result: Response | null = null;
const clearResult = () => {
  result = null;
};
const cloneResult = () => result!.clone();

let loading: Promise<void> | null = null;
const loadResult = async () => {
  try {
    let totalTime = performance.now();

    const res = await fetch("https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/dev/result.json");
    result = new Response(await res.text());
    setTimeout(clearResult, 10000);

    totalTime = performance.now() - totalTime;
    console.info('Loading new results:', totalTime);
  } catch (e) {
    console.error(e);
    result = new Response('Failed to fetch!');
  }

  loading = null;
}

export const GET: APIRoute = () => result === null
  ? (loading === null ? loading = loadResult() : loading).then(cloneResult)
  : cloneResult();
