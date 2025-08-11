import { defineAction } from 'astro:actions';

const cache = <T>(f: () => Promise<T>, delay: number) => {
  let val: T;
  const unset = () => {
    val = null as any;
  }
  const get = async () => {
    val = await f();
    setTimeout(unset, delay);
    return val;
  }
  return defineAction({
    handler: () => val ?? get()
  });
}

const getJSON = async (link: string) => (await fetch(link)).json();

export const server = {
  getStartupSize: cache(async () => {
    const RESULTS = "https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/main/.results";

    const results = await Promise.all([
      getJSON(RESULTS + "/index.json"),
      getJSON(RESULTS + "/size.json")
    ]);

    return {
      startup: results[0] as Record<
        string,
        Record<string, Record<string, [string, number][]>>
      >,
      size: results[1] as {
        name: string,
        category: string,
        size: Record<string, number>
      }[]
    };
  }, 30000)
}
