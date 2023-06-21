import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ content }) => {
  const { title, cookingTime, slug, thumbnail } = content;

  return (
    <div className="rotate-1 bg-white">
      <div>
        <Image
          src={"https:" + thumbnail.fields.file.url}
          alt={thumbnail.fields.file.fileName}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className="shadow-sm relative top--10 left--2.5">
        <div className="p-4">
          <h4 className="uppercase mx-1 font-semibold">{title}</h4>
          <p className="text-gray-600 m-0">Time to cook: {cookingTime} min</p>
        </div>
        <div className="mt-5 flex justify-end">
          <Link
            className="text-white bg-red-600 px-4 py-6"
            href={`/recipes/${slug}`}
          >
            Cook this
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
