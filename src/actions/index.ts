import { defineAction } from 'astro:actions';

let startupSize: Record<
  string,
  Record<string, Record<string, [string, number][]>>
>;
const getStartupSize = async () => startupSize = await (
  await fetch("https://raw.githubusercontent.com/js-benchmark-all/startup-size/refs/heads/main/.results/index.json"
)).json();

setTimeout(getStartupSize, 60 * 1000);

export const server = {
  getStartupSize: defineAction({
    handler: () => startupSize ?? getStartupSize()
  })
}
