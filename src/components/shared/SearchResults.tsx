import { SearchResultProps } from '@/types';
import GridPostList from './GridPostList';
import Loader from './Loader';

const SearchResults = ({
	isSearchFetching,
	searchedPost,
}: SearchResultProps) => {
	if (isSearchFetching) {
		return <Loader />;
	}
	if (searchedPost && searchedPost.documents.length > 0) {
		return <GridPostList posts={searchedPost.documents} />;
	}
	return (
		<p className="text-light-4 mt-10 text-center w-full">No results found</p>
	);
};

export default SearchResults;
