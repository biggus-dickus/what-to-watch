import * as React from 'react';

interface Props {
  activeTab: string,
  tabs: string[],
  onTabClick: (newTab: string) => void
}

const FilmNav = ({tabs, activeTab, onTabClick}: Props): React.ReactElement => {
  if (new Set(tabs).size !== tabs.length) {
    throw new Error(`tabs must contain unique strings`);
  }

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((tab) => {
          const classList = [`movie-nav__item`];

          if (tab === activeTab) {
            classList.push(`movie-nav__item--active`);
          }

          return (
            <li key={tab} className={classList.join(` `)}>
              <a href="{`#${tab.toLowerCase().replace(/ /g, `-`)}`}"
                className="movie-nav__link"
                onClick={onTabClick.bind(null, tab)}>
                {tab}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FilmNav;
