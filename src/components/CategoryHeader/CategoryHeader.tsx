import { FC } from 'react';
import { STATIC_DATA } from '../../config/StaticData';
import { CategoryHeaderModel } from '../../models/CategoryHeader.model';
import './CategoryHeader.scss';
import * as Images from '../../assets';

const CategoryHeader: FC<CategoryHeaderModel.IProps> = () => {
  const {
    ENGLISH: {
      App: { CATEGORIES },
    },
  } = STATIC_DATA;

  return (
    <div id='category-header-div'>
      <ul>
        {Object.keys(CATEGORIES).map((category) => (
          <li key={category}>
            <img
              src={
                (Images as any)[
                  (CATEGORIES as { [key: string]: string })[category]
                ]
              }
            ></img>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryHeader;