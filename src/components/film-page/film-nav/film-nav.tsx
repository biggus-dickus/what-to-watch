import * as React from 'react';
import {Link} from 'react-router-dom';

interface NavTab {id: string, text: string}

interface Props {
  activeTabId: string,
  tabs: NavTab[],
  onTabClick: (newTab: string) => void
}

const FilmNav = ({tabs, activeTabId, onTabClick}: Props): React.ReactElement => {
  if (new Set(tabs).size !== tabs.length) {
    throw new Error(`tabs must contain unique elements`);
  }

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((tab) => {
          const classList = [`movie-nav__item`];

          if (tab.id === activeTabId) {
            classList.push(`movie-nav__item--active`);
          }

          return (
            <li key={tab.id} className={classList.join(` `)}>
              <Link to={`#${tab.id}`}
                className="movie-nav__link"
                onClick={onTabClick.bind(null, tab.id)}>
                {tab.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FilmNav;
