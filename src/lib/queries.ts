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
