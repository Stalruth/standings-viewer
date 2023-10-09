export async function load({params}) {
  return {
    year: params.year,
    name: params.event,
    division: params.division
  };
}
