import './Filters.css'

const FilterButton = ( {label, category, currentFilter, onFilter} ) => {

    return (
        <button 
        className={`filter-btn ${category === currentFilter ? 'active' : ''}`} onClick={() => onFilter(category)}
        >
            {label}
        </button>
    )
};

export default FilterButton;