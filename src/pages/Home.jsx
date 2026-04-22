import { useState, useEffect } from "react";
import FilterBar from "../components/Filters/FilterBar";
import Hero from "../components/Hero/Hero";
import PostsGrid from "../components/PostCard/PostsGrid";
import StatsBar from "../components/Stats/StatsBar";
import PostModal from "../components/PostModal/PostModal";

const Home = ({onAddToCart, posts, showToast}) => {
    //states
    const [currentFilter, setCurrentFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSort, setCurrentSort] = useState('newest');
    const [currentSubCategory, setCurrentSubCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);


    const getPostByCategory = (currentFilter, posts) => currentFilter === 'all' ? posts : posts.filter(post => post.category === currentFilter);

    const searchPost = (searchTerm, posts) => {
        const term = searchTerm.toLowerCase().trim();

        if(term === '') return posts;

        return posts.filter(({title, excerpt, author, tags}) => title.toLowerCase().includes(term) || excerpt.toLowerCase().includes(term) || author.toLowerCase().includes(term) || tags.some(tag => tag.toLowerCase().includes(term)));
    };

    const sortPosts = (posts, currentSort) => {
        const copyPosts = [...posts];

        if (currentSort === 'newest') return copyPosts.sort((a,b) => new Date(b.publishedDate) - new Date(a.publishedDate));

        else if ( currentSort === 'oldest') return copyPosts.sort((a,b) => new Date(a.publishedDate) - new Date(b.publishedDate));

        else if (currentSort === 'popular') return copyPosts.sort((a,b) => b.views - a.views );

        else if (currentSort === 'title') return copyPosts.sort((a,b) => a.title.localeCompare(b.title));

        else return copyPosts;

    };

    //derived data

    const filteredPosts = (() => {
        let result = posts;

        result = getPostByCategory(currentFilter, result);

        if (currentSubCategory !== 'all') {
            result = result.filter(post => post.subCategory === currentSubCategory);
        }

        result = searchPost(searchTerm, result);
        
        result = sortPosts(result, currentSort);


        return result;
    })(); 
    
    //modal function
    const openPost = (slug) => {
        const post = posts.find(post => post.slug === slug);
        if (!post) {
            showToast(`Post not found`);
            return;
        }
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closePost = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };
    
    //filter functions
    const handleSearch = (value) => {
        setSearchTerm(value)
    };

    const handleSort = (value) => {
        setCurrentSort(value);
    };

    const handleFilter = (category) => {
        setCurrentFilter(category);
        setCurrentSubCategory('all');
    };

    const handleSubCategory = (subCategory) => {
        setCurrentSubCategory(subCategory);
    };

    return (
        <>
            
            <PostModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={closePost}
                onAddToCart={onAddToCart}
            />
            
            <Hero 
                onSearch={handleSearch}
                searchTerm={searchTerm}
            />
            <FilterBar 
                currentFilter={currentFilter}
                currentSubCategory={currentSubCategory}
                onFilter={handleFilter}
                onSubCategory={handleSubCategory}
                currentSort={currentSort}
                onSort={handleSort}
            />
            <StatsBar 
                posts={filteredPosts} 
            />
            <PostsGrid 
                posts={filteredPosts}
                onViewPost={openPost}
                onAddToCart={onAddToCart}
            />
        </>
    )
}

export default Home;