import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import {
  averageRatingSelector,
  restaurantSelector,
} from '../../redux/selectors';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import styles from './restaurant.module.css';

const Restaurant = ({ restaurant, averageRating, match }) => {
  const { id, name, menu, reviews } = restaurant;

  const tabs = [
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <div className={styles.tabs}>
        {tabs.map(({ id, label }) => (
          <NavLink
            key={id}
            to={`${match.url}/${label.toLowerCase()}`}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <Switch>
        <Route path={`${match.url}/menu`}>
          {() => <Menu menu={menu} key={id} restId={id} />}
        </Route>
        <Route path={`${match.url}/reviews`}>
          {() => <Reviews reviews={reviews} restId={id} />}
        </Route>
        <Redirect to={`${match.url}/menu`} />
      </Switch>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array,
  }).isRequired,
  averageRating: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantSelector(state, props),
  averageRating: averageRatingSelector(state, props),
});

export default connect(mapStateToProps)(Restaurant);
