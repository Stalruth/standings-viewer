export async function load({params}) {
  return await { year: params.year };
}
