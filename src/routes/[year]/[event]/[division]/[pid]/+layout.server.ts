export const load = async (event) => {
    const parent = await event.parent();
    return {
        breadcrumbs: parent.breadcrumbs.concat({
            title: 'Player Details',
            href: `/${event.params.year}/${event.params.event}/${event.params.division}/${event.params.pid}`
        })
    };
}
