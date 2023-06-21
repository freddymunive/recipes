import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from "next/image";
import Skeleton from "../../components/recipe/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipe: items[0],
    },
    revalidate: 1,
  };
}

const RecipePage = ({ recipe }) => {
  console.log({ recipe });
  if (!recipe) return <Skeleton />;
  const { title, ingredients, featuredImage, cookingTime, method } =
    recipe.fields;

  const ingredientsMap = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  return (
    <div>
      <h1>{title}</h1>
      <Image
        src={"https:" + featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      />
      <p>{`Time to make ${cookingTime} min`}</p>
      <ul>{ingredientsMap}</ul>
      <p>{documentToReactComponents(method)}</p>
    </div>
  );
};

export default RecipePage;
