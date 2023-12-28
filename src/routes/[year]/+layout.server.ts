export const load = async (event) => {
    const parent = await event.parent();
    return {
        breadcrumbs: parent.breadcrumbs.concat({
            title: event.params.year,
            href: `/${event.params.year}`
        })
    };
}
