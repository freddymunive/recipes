import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { createClient } from "contentful";
import RecipeCard from "../components/recipe/recipeCard";

export default function Index({ preview, recipes }) {
  const recipesMap = recipes.map((item) => (
    <RecipeCard key={item.sys.id} content={item.fields} />
  ));

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{`Next.js and ${CMS_NAME} Blog Page`}</title>
        </Head>
        <Container>{recipesMap}</Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({
    content_type: "recipe",
  });

  return {
    props: {
      recipes: res.items,
    },
  };
}
