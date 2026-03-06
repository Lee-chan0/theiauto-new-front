import CategoryContainer from "./CategoryContainer";

interface CategoryPageProp {
  params: Promise<{
    categoryId: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProp) {
  const resolvedParams = await params;
  const currentId = resolvedParams.categoryId;

  return (
    <CategoryContainer currentId={Number(currentId)} />
  )
}