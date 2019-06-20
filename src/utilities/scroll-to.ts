type Behaviour = 'smooth' | 'auto'; // eslint-disable-line

interface Params {
  behaviour?: Behaviour,
  left?: number
}

export default function scrollTo(offsetTop: number, config: Params = {}) {
  const {behaviour, left} = config; // optional argument

  window.scroll({
    behavior: behaviour || `smooth`,
    left: left || 0,
    top: offsetTop
  });
}
