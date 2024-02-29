import { Metadata } from "next";

const ORIGIN = "https://healthbound.run";

export const DEFAULT_META = {
  title: "Healthbound",
  description:
    "Create your soulbound token associated with your health & claim Healthbound Tokens every day",
  image: `${ORIGIN}/og.png`,
};

export const getPathMetadata = (
  path: string,
  props?: { title?: string; description?: string; image?: string }
) => {
  const defaultTitle = DEFAULT_META.title;
  const modifiedProps = props && {
    ...props,
    title: `${props.title} | ${defaultTitle}`,
  };
  const base: Metadata = {
    title: defaultTitle,
    description: DEFAULT_META.description,
    image: DEFAULT_META.image,
    metadataBase: new URL(ORIGIN),
    ...modifiedProps,
  };
  const openGraph = {
    images: [{ url: props?.image ? props?.image : DEFAULT_META.image }],
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    type: "website",
    url: `${ORIGIN}${path}`,
    ...modifiedProps,
  };
  const twitter = {
    title: DEFAULT_META.title,
    description: DEFAULT_META.description,
    image: props?.image ? props?.image : DEFAULT_META.image,
    cardType: "summary_large_image",
    url: `${ORIGIN}${path}`,
    ...modifiedProps,
  };
  const icons = [
    {
      rel: "icon",
      type: "image/png",
      sizes: "24x24",
      url: `${ORIGIN}/favicon.ico`,
    },
  ];
  return { ...base, openGraph, twitter, icons };
};
