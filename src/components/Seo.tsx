import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface ISeoProps {
  title: string;
}

export default function Seo({ title }: ISeoProps) {
  const data = useStaticQuery<Queries.SeoDataQuery>(graphql`
    query SeoData {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
          }
        }
      }
    }
  `);

  const metaDescription = data.site?.siteMetadata?.description;
  const defaultTitle = data.site?.siteMetadata?.title;
  return (
    <>
      <title>
        {title} | {data.site?.siteMetadata?.title}
      </title>
      <meta
        name="google-site-verification"
        content="XL6-ClgS_GEIhXSSUFjDfIfcFP2oFPYFapfyNH5cDC4"
      />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={data.site?.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
}
