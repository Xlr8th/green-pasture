import './Filters.css'
import FilterButton from './FilterButton';

const FilterBar = ({ currentFilter, onFilter, currentSubCategory, onSubCategory, currentSort, onSort }) => {

  const filters = [
    { label: 'All Content', category: 'all' },
    { label: '📝 Articles', category: 'article' },
    { label: '📚 Books', category: 'book' },
    { label: '🎥 Videos', category: 'video' },
    { label: '🎧 Podcasts', category: 'audio' },
  ];

  const subCategories = [
    { subCategory: 'all', subLabel: 'All Articles' },
    { subCategory: 'word', subLabel: 'Word' },
    { subCategory: 'parenting', subLabel: 'Parenting' },
    { subCategory:'marriage', subLabel: 'Marriage' },
    { subCategory: 'lifestyle', subLabel: 'Lifestyle' },
  ];

  return (
    <section className="filters">
      <div className="container">
        <div className="filter-buttons">
          {filters.map(({category, label}) => (
            <FilterButton
              key={category} 
              currentFilter={currentFilter}
              onFilter={onFilter}
              category={category}
              label={label}
            />
          ) )}
        </div>
        
        {currentFilter === 'article' && 
          <div className='subcategory-buttons'>
            {subCategories.map(({subCategory, subLabel}) => (
              <button 
                className={`subcategory-btn ${subCategory === currentSubCategory ? 'active' : ''}`} onClick={() => onSubCategory(subCategory)} key={subCategory}
              >
                {subLabel}
              </button>
            ))}            
          </div>
        }        

        <div className="sort-container">
          <label>Sort by:</label>
          <select 
            id="sort-select" 
            value={currentSort}
            onChange={(e) => onSort(e.target.value)}
          >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default FilterBar;