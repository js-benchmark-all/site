import { defineAction } from 'astro:actions';

const cache = <T>(fn: () => Promise<T>, delay: number) => {
  let val: T;
  const unset = () => {
    val = null as any;
  }
  const get = async () => {
    val = await fn();
    setTimeout(unset, delay);
    return val;
  }
  return () => val ?? get();
}

const json = (link: string) => async () => (await fetch(link)).json();

export const server = {
  getTimes: defineAction({
    handler: cache<
      Record<
        string,
        Record<string, Record<string, [string, number][]>>
      >
    >(
      json("https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/main/.results/index.json"),
      30000
    )
  })
}
