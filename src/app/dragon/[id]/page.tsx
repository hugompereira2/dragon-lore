import DragonPage from "./DragonPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
     <DragonPage id={id} />
  )
}
