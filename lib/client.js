import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2023-02-20',
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}

export default client;
