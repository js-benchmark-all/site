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
  startupSize: cache<Record<string, any>>(async () => (await fetch("https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/dev/result.json")).json(), 20000)
}
