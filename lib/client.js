import sanityClient from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

 export const client = sanityClient({
  projectId: "00ji1vc6",
  dataset: "production",
  apiVersion: "2023-02-21",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
 });


const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
