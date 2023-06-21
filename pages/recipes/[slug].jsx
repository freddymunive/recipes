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
  if (!recipe) return <Skeleton />;
  const { title, ingredients, featuredImage, cookingTime, method } =
    recipe.fields;

  const ingredientsMap = ingredients.map((ingredient, index) => (
    <li className="text-gray-800" key={index}>
      {ingredient}
    </li>
  ));

  return (
    <div className="bg-yellow-400 h-screen ">
      <div className="flex flex-col justify-center h-screen items-center">
        <div className="relative w-6/12 ">
          <h1 className="absolute bg-white p-2 font-semibold bottom-0">
            {title}
          </h1>
          <Image
            src={"https:" + featuredImage.fields.file.url}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
            alt={featuredImage.fields.file.fileName}
          />
        </div>
        <div className="mt-10 w-6/12 ">
          <p className="mb-3 text-gray-700">{`Time to make ${cookingTime} min`}</p>
          <h4 className="uppercase font-medium">Ingredients:</h4>
          <ul className="mb-3">{ingredientsMap}</ul>
          <h4 className="uppercase font-medium">method: </h4>
          <p className="text-gray-800 pb-6">
            {documentToReactComponents(method)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
