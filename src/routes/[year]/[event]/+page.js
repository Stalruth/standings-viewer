export async function load({params}) {
  return {
    year: params.year,
    eventId: params.event
  };
}
