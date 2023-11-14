const { persisted } = await import('svelte-persisted-store');

export function getFavouritesStore(year: string, eventId: string, division: string) {
    return persisted(`favourites-${year}-${eventId}-${division}`, '');
}
