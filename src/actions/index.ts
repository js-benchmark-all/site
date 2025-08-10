import { defineAction } from 'astro:actions';

const RESULTS = "https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/main/.results";

const cache = <T>(link: string, delay: number) => {
  let val: T;
  const unset = () => {
    val = null as any;
  }
  const get = async () => {
    val = await (await fetch(link)).json();
    setTimeout(unset, delay);
    return val;
  }
  return defineAction({
    handler: () => val ?? get()
  });
}

export const server = {
  getTimes: cache<
    Record<
      string,
      Record<string, Record<string, [string, number][]>>
    >
  >(RESULTS + "/index.json", 30000),
  getSizes: cache<
    {
      name: string,
      category: string,
      size: Record<string, number>
    }[]
  >(RESULTS + "/size.json", 30000)
}
