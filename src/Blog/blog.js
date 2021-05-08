import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { getDataAuthor } from './Store/blogSlice';

const Blog = () => {

    const dispatch = useDispatch();

    const [data, setData] = useState([])
    const [fetchLength, setFetchLength] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [call, setCall] = useState(false);

    const { userData } = useSelector(state => state.blog)

    useEffect(() => {
        dispatch(getDataAuthor({ id: null }))
        setCall(true);
        document.title = 'Blog Listing';
    }, [])

    useEffect(() => {
        fetchMore(userData)
    }, [userData])

    const fetchMore = (userDataList) => {
        let old_data = data;
        const blog_data = [];
        if (userDataList && userDataList.length > 0 && userDataList.length >= fetchLength && call) {
            for (let i = 0; i < fetchLength + 10; i++) {
                blog_data.push(userDataList[i])
            }
            setFetchLength(fetchLength + 10);
            old_data = old_data.concat(blog_data);
            setData(old_data);
        }
    }

    const fetchData = () => {
    
        if (data?.length >= userData.length) {
            setHasMoreData(false);
            return;
        }
        setTimeout(() => {
            fetchMore(userData)
            setHasMoreData(true);
        }, 500);
    }



    return (
        <>
            <div>
                <div className="text-center m-10 text-2xl font-bold">
                    Blog Listing
                </div>
                <div id="blogList" className="blogView">
                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchData}
                        hasMore={hasMoreData}
                        loader={<h4 className="text-center mt-10">Loading...</h4>}
                        // style={{ overflow: 'hidden' }}
                        endMessage={
                            <p className="text-center mt-10">
                                No More Blog !!
                            </p>
                        }
                        scrollableTarget="blogList"
                    >
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => (
                                    <>
                                    {(item && item.id) &&
                                    <div className="border-4 mx-24 p-4 rounded mt-4">
                                        <div>
                                            <div className="font-bold">
                                                <NavLink className="nav-link" aria-current="page" to={`/authorDetails/${item.id}`}>
                                                    {index + 1}. {item.name}
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>}
                                    </>
                                )) : ''
                        }
                    </InfiniteScroll>

                    {/* <div className="border-4 mx-24 p-4 rounded mt-4">
                        <div>
                            <div className="font-bold">
                                1. Blog Header
                            </div>
                            <div className="text-xs mx-5 my-2">
                                Blog Content...
                            </div>
                        </div>
                    </div>
                    <div className="border-4 mx-24 p-4 rounded mt-4">
                        <div>
                            <div className="font-bold">
                                1. Blog Header
                            </div>
                            <div className="text-xs mx-5 my-2">
                                Blog Content...
                            </div>
                        </div>
                    </div>
                    <div className="border-4 mx-24 p-4 rounded mt-4">
                        <div>
                            <div className="font-bold">
                                1. Blog Header
                            </div>
                            <div className="text-xs mx-5 my-2 truncate">
                                Blog Content Blog Content Blog Content Blog Content Blog Content Blog Content Blog Content Blog Content Blog Content Blog Content Blog Content Blog ContentvBlog Content Blog Content Blog Content
                            </div>
                        </div>
                    </div>
                    <div className="border-4 mx-24 p-4 rounded mt-4">
                        <div>
                            <div className="font-bold">
                                1. Blog Header
                            </div>
                            <div className="text-xs mx-5 my-2">
                                Blog Content...
                            </div>
                        </div>
                    </div>
                    <div className="border-4 mx-24 p-4 rounded mt-4">
                        <div>
                            <div className="font-bold">
                                1. Blog Header
                            </div>
                            <div className="text-xs mx-5 my-2">
                                Blog Content...
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Blog;