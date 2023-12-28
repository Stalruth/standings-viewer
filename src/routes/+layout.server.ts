export const load = async (event) => {
    return {
        breadcrumbs: [{
            title: 'Index',
            href: '/'
        }] as { title: string, href: string }[]
    }
}
