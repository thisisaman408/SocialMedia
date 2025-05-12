import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queries';
import { InfiniteData } from '@tanstack/react-query';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
const Explore = () => {
	const { ref, inView } = useInView();
	const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

	const [search, setSearch] = useState('');
	const debouncedValue = useDebounce(search, 500);
	const { data: searchedPost, isFetching: isSearchFetching } =
		useSearchPosts(debouncedValue);

	useEffect(() => {
		if (inView && !search) fetchNextPage();
	}, [inView, fetchNextPage, search]);
	if (!posts) {
		return <Loader />;
	}

	const shouldShowSearchResults = search !== '';
	const shouldShowPosts =
		!shouldShowSearchResults &&
		(
			posts as InfiniteData<Models.DocumentList<Models.Document> | undefined>
		)?.pages.every(
			(item: Models.DocumentList<Models.Document> | undefined) =>
				item?.documents.length === 0
		);
	return (
		<div className="explore-container">
			<div className="explore_inner-container">
				<h2 className="h3-bold md:h2-bold w-full mb-5">Search Posts</h2>
				<div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
					<img
						src="/assets/icons/search.svg"
						alt="search"
						width={24}
						height={24}
					/>
					<Input
						type="text"
						placeholder="Search"
						className="explore-search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex-between w-full max-w-5xl mt-16 mb-7">
				<h2 className="body-bold md:h3-bold">Popular Today</h2>
				<div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
					<p className="small-medium md:base-medium text-light-2">All</p>
					<img
						src="/assets/icons/filter.svg"
						alt="filter"
						width={20}
						height={20}
					/>
				</div>
			</div>
			<div className="flex flex-wrap gap-9 w-full max-w-5xl">
				{shouldShowSearchResults ? (
					<SearchResults
						isSearchFetching={isSearchFetching}
						searchedPost={searchedPost}
					/>
				) : shouldShowPosts ? (
					<p className="text-light-4 mt-10 text-center w-full">End of Posts</p>
				) : (
					posts.pages.map((item, index) => (
						<GridPostList key={`page-${index}`} posts={item?.documents || []} />
					))
				)}
			</div>
			{hasNextPage && !search && (
				<div ref={ref} className="mt-10 ">
					<Loader />
				</div>
			)}
		</div>
	);
};

export default Explore;
