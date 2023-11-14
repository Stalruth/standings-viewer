function getTeamDisplay(team) {
  const display = ['', '', '', '', '', ''];
  (team ?? []).forEach((el, i) => {
    display[i] = el;
  });
  display.sort((a,b) => {
    if (!a.species) {
      return 1;
    }
    if (!b.species) {
      return -1;
    }
  });
  return display;
}

export default getTeamDisplay;
export { getTeamDisplay };
