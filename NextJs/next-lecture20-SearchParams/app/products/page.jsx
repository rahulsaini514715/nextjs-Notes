// const Products = async () => {
const Products = async ({ searchParams }) => {

    // console.log(searchParams); // server console me aayega

    const searchParam = await searchParams;
    console.log(searchParam);

  const category = searchParam?.category || "all";
  const sort = searchParam?.sort || "default";
  const page = searchParam?.page || 1;

  return (
    <div>
      Showing {category} products, sorted by {sort}, page {page}
    </div>
  );
};

export default Products;
