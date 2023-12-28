export const load = async (event) => {
    const parentData = await event.parent();
    return {
        breadcrumbs: parentData.breadcrumbs.concat({
            title: 'Division Index',
            href: `/${event.params.year}/${event.params.event}`
        })
    };
}
