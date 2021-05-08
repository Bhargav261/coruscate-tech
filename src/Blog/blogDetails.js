import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { setResetAuthorDetails, getDataAuthor, getDataAuthorDetails, getComments } from './Store/blogSlice';

const BolgDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { userData, authorDetailsData, fetchStatus } = useSelector(state => state.blog)

    const [data, setData] = useState([]);
    const [fetchLength, setFetchLength] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [details, setDetails] = useState([]);
    const [sortDate, setSortDate] = useState(false);
    const [sortLike, setSortLike] = useState(false);
    const [status, setStatus] = useState({
        status: null,
        name: null
    })


    useEffect(() => {
        if (id == 'total_comments' || id == 'total_likes') {
            dispatch(getDataAuthorDetails({ view: "total_likes", order: 'desc' }))
        } else {
            dispatch(getDataAuthor({ id: id }))
            dispatch(getDataAuthorDetails({ id: id, view: "", order: 'asc' }))
        }
        setHasMoreData(true);
    }, [id])

    useEffect(() => {
        if (userData && userData.length > 0) {
            setDetails(userData[0]);
            document.title = userData[0].name;
        }
    }, [userData])

    useEffect(() => {
        if (authorDetailsData && authorDetailsData.length > 0 && fetchStatus) {
            fetchMore()
        }
    }, [authorDetailsData])

    const sortByLike = () => {
        setData([]);
        setHasMoreData(true);
        dispatch(getDataAuthorDetails({ id: id, view: "total_likes", order: sortLike ? 'asc' : 'desc' }));
        setFetchLength(0);
        setStatus({
            status: !sortLike,
            name: 'likes'
        })
        setSortLike(!sortLike);
        setSortDate(false);
    }

    const sortByDate = () => {
        setData([]);
        setHasMoreData(true);
        dispatch(getDataAuthorDetails({ id: id, view: "publish_date", order: sortDate ? 'asc' : 'desc' }));
        setFetchLength(0);
        setStatus({
            status: !sortDate,
            name: 'date'
        })
        setSortDate(!sortDate);
        setSortLike(false);
    }

    const fetchMore = () => {
        let old_data = data;
        const comment_data = [];
        if (authorDetailsData && authorDetailsData.length > 0 && authorDetailsData.length >= fetchLength) {
            for (let i = 0; i < fetchLength + 10; i++) {
                comment_data.push(authorDetailsData[i])
            }
            setFetchLength(fetchLength + 10);
            old_data = old_data.concat(comment_data);
            setData(old_data);
        }
    }

    const fetchData = () => {
        if (data?.length >= authorDetailsData.length) {
            setHasMoreData(false);
            return;
        }
        setTimeout(() => {
            if(id == 'total_comments' && id == 'total_likes' && fetchLength <= 10){
                fetchMore(authorDetailsData);
            }
            if(id != 'total_comments' && id != 'total_likes' ){
                fetchMore(authorDetailsData);
            }
            setHasMoreData(true);
        }, 500);
    }

    return (
        <>
            <div>
                <div>
                    {
                        details ?
                            <>
                                <div className="text-center m-10 text-2xl font-bold">
                                    {
                                        ((id != 'total_comments') && (id != 'total_likes')) ?
                                            details.name
                                        : 
                                            id == 'total_comments' ? 'Top 10 Comment ' : 'Top 10 Liked'
                                     } Posts
                                </div>
                                <div className="flex wrap my-10 mx-24">
                                    {
                                        (data && (data.length > 0) && (id != 'total_comments') && (id != 'total_likes')) &&
                                        <>
                                            <button className="p-2 mr-5 text-center border-4 w-54 border-indigo-300 rounded bg-indigo-200" onClick={sortByDate}>
                                                {
                                                    status && status.name == 'date' ?
                                                        status.status ?
                                                            <i class="fa fa-arrow-up mr-1" aria-hidden="true"></i>
                                                            :
                                                            <i class="fa fa-arrow-down mr-1" aria-hidden="true"></i>
                                                        : ''
                                                }
                                                Sort By Date Published
                                            </button>
                                            <button className="p-2 text-center border-4 w-54 border-indigo-300 rounded bg-indigo-200" onClick={sortByLike}>
                                                {
                                                    status && status.name == 'likes' ?
                                                        status.status ?
                                                            <i class="fa fa-arrow-up mr-1" aria-hidden="true"></i>
                                                            :
                                                            <i class="fa fa-arrow-down mr-1" aria-hidden="true"></i>
                                                        : ''
                                                }
                                                Sort By Likes
                                            </button>
                                        </>
                                    }
                                </div>
                                {
                                    data && data.length > 0 ?
                                        <div id="comments" className="authorDetailsView">
                                            <InfiniteScroll
                                                dataLength={data.length}
                                                next={fetchData}
                                                hasMore={hasMoreData}
                                                loader={<h4 className="text-center mt-10">Loading...</h4>}
                                                endMessage={
                                                    <p className="text-center mt-10">
                                                        No More Posts !!
                                            </p>
                                                }
                                                scrollableTarget="comments"
                                            >
                                                {
                                                    data.map((item, index) => (
                                                        <>
                                                            {(item && item.id) &&
                                                                <div className="border-4 mx-24 p-4 rounded mt-4">
                                                                    <div className="font-bold">
                                                                        <NavLink className="nav-link" aria-current="page" to={`/postDetails/${item.id}`}>
                                                                            {index + 1}. {item.title}
                                                                        </NavLink>
                                                                    </div>
                                                                    {/* <div className="mx-5">
                                                                {item.title}
                                                            </div> */}
                                                                </div>
                                                            }
                                                        </>
                                                    ))
                                                }
                                            </InfiniteScroll>
                                        </div>
                                        : ''
                                }
                            </>
                            : ''
                    }
                </div>
                <div>
                </div>
            </div>
        </>
    )
}

export default BolgDetails;