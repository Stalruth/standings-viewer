export const load = async (event) => {
    const parent = await event.parent();
    const name = `${event.params.division[0].toUpperCase()}${event.params.division.slice(1)}`;
    return {
        breadcrumbs: parent.breadcrumbs.concat({
            title: name,
            href: `/${event.params.year}/${event.params.event}/${event.params.division}`
        })
    };
}
