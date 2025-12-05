import groq from "groq";

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seo {
      title,
      description,
      image
    },
    contentBlocks[] {
      _type,
      _key,
      ...,
      image {
        ...,
        asset->
      },
      images[] {
        ...,
        asset->
      },
      overlayText[] {
        ...,
        markDefs[] {
          ...,
          _type == "link" => {
            ...,
            href
          }
        }
      }
    }
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] {
    _id,
    title,
    slug
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"] | order(order asc) {
    _id,
    title,
    label,
    linkType,
    page-> {
      _id,
      title,
      slug
    },
    externalUrl,
    children[] {
      label,
      page-> {
        _id,
        title,
        slug
      }
    }
  }
`;
