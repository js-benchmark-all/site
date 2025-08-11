import { defineAction } from 'astro:actions';

const RESULTS = "https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/main/.results";

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
  getStartupSize: cache<{
    startup: Record<
      string,
      Record<string, Record<string, [string, number][]>>
    >,
    size: {
      name: string,
      category: string,
      size: Record<string, number>
    }[]
  }>(async () => {
    const results = await Promise.all([
      getJSON(RESULTS + "/index.json"),
      getJSON(RESULTS + "/size.json")
    ]);
    return {
      startup: results[0],
      size: results[1]
    }
  }, 30000)
}
