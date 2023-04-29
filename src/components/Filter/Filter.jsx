import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, handleChange }) => {
  return (
    <div className={css.wrapper}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          name="filter"
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
