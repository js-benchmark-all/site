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

export const server = {
  getStartupSize: defineAction({
    handler: cache<
      Record<
        string,
        Record<string, Record<string, [string, number][]>>
      >
    >(
      async () => (
        await fetch("https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/main/.results/index.json")
      ).json(),
      30000
    )
  })
}
