import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { getLikes, getDataPostDetails, getComments } from './Store/blogSlice';

const BolgDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { likeData, postDetailsData, commentData } = useSelector(state => state.blog)

    const [data, setData] = useState([]);
    const [fetchLength, setFetchLength] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [details, setDetails] = useState([]);
    const [viewComment, setViewComment] = useState(false);


    useEffect(() => {
        dispatch(getDataPostDetails({ id: id }))
        dispatch(getLikes({ id: id }))
    }, [id])

    useEffect(() => {
        if (postDetailsData && postDetailsData.length > 0) {
            setDetails(postDetailsData[0]);
            document.title = postDetailsData[0].title;
        }
    }, [postDetailsData])

    useEffect(() => {
        // setData(commentData)
        fetchMore()
    }, [commentData])

    const viewComments = () => {
        setViewComment(true);
        dispatch(getComments({ id: id }));
        setHasMoreData(true);
    }

    const closeComments = () => {
        setViewComment(false);
        setData([]);
        setFetchLength(0);
    }

    const fetchMore = () => {
        let old_data = data;
        const comment_data = [];
        if (commentData && commentData.length > 0 && commentData.length >= fetchLength) {
            for (let i = 0; i < fetchLength + 10; i++) {
                comment_data.push(commentData[i])
            }
            setFetchLength(fetchLength + 10);
            old_data = old_data.concat(comment_data);
            setData(old_data);
        }
    }

    const fetchData = () => {
        if (data?.length >= commentData.length) {
            setHasMoreData(false);
            return;
        }
        setTimeout(() => {
            fetchMore(commentData)
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
                                    {details.title}
                                </div>
                                <div className="border-4 mx-24 p-4 rounded mt-4">
                                    {details.title} Post
                                </div>
                                <div>
                                    <center>
                                        {
                                            data && data.length > 0 && viewComment ?
                                                <button className="m-10 text-center border-4 w-40 border-indigo-300 rounded bg-indigo-200" onClick={closeComments}> <i class="fa fa-arrow-up" aria-hidden="true"></i> Close Comments </button>
                                                :
                                                <button className="m-10 text-center border-4 w-40 border-indigo-300 rounded bg-indigo-200" onClick={viewComments}> <i class="fa fa-arrow-down" aria-hidden="true"></i> View Comments </button>
                                        }
                                    </center>
                                </div>
                                {
                                    data && data.length > 0 && viewComment ?
                                        <>
                                            <div className="text-xl ml-24">
                                                <i class="fa fa-comments" aria-hidden="true"></i> {commentData.length} Comments
                                                <i class="fa fa-thumbs-up ml-10" aria-hidden="true"></i> {likeData.length} Likes
                                            </div>
                                            <div id="comments" className="commentView">
                                                <InfiniteScroll
                                                    dataLength={data.length}
                                                    next={fetchData}
                                                    hasMore={hasMoreData}
                                                    loader={<h4 className="text-center mt-10">Loading...</h4>}
                                                    endMessage={
                                                        <p className="text-center mt-10">
                                                            No More Comments !!
                                            </p>
                                                    }
                                                    scrollableTarget="comments"
                                                >
                                                    {
                                                        data.map((item, index) => (
                                                            <>{item && item.body &&
                                                                <div className="border-2 mx-24 p-4 rounded mt-4">
                                                                    <div className="mx-5">
                                                                        {item.body}
                                                                    </div>
                                                                </div>}
                                                            </>
                                                        ))
                                                    }
                                                </InfiniteScroll>
                                            </div>
                                        </>
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