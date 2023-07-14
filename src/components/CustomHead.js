import Head from 'next/head';
import { Children } from 'react';

const CustomHead = ({ title, description, image, url }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
  </Head>
);

export default CustomHead;
