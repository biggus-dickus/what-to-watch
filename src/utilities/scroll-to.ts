type Behaviour = 'smooth' | 'auto'; // eslint-disable-line

interface Params {
  behaviour?: Behaviour,
  left?: number
}

export default function scrollTo(offsetTop: number, config: Params = {}) {
  const {behaviour = `smooth`, left = 0} = config; // optional argument

  window.scroll({
    behavior: behaviour,
    left,
    top: offsetTop
  });
}
