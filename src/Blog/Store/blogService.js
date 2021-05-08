import axios from 'axios';

class blogService {

    getDataAuthor = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get('http://localhost:3000/author'
            ,{
                params: {
                    id: id,
                }
            }
            )
            request.then((response) => {
                const { data,status } = response;
                if(status == 200){
                    resolve({ data });
                }else{
                    reject({ message : 'Error in retrive Data' });
                }
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    getDataAuthorDetails = ({ id, view, order }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get('http://localhost:3000/posts'
            ,{
                params: {
                    authorId: id,
                    _sort: view,
                    _order: order
                }
            }
            )
            request.then((response) => {
                const { data,status } = response;
                if(status == 200){
                    resolve({ data });
                }else{
                    reject({ message : 'Error in retrive Data' });
                }
                
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    getDataPostDetails = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get('http://localhost:3000/posts'
            ,{
                params: {
                    id: id,
                }
            }
            )
            request.then((response) => {
                const { data,status } = response;
                if(status == 200){
                    resolve({ data });
                }else{
                    reject({ message : 'Error in retrive Data' });
                }
                
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };


    getComments = ({id}) => {
        return new Promise((resolve, reject) => {
            const request = axios.get('http://localhost:3000/comments'
            ,{
                params: {
                    postId: id,
                }
            })
            request.then((response) => {
                const { data,status } = response;
                if(status == 200){
                    resolve({ data });
                }else{
                    reject({ message : 'Error in retrive Data' });
                }
                
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    getLikes = ({id}) => {
        return new Promise((resolve, reject) => {
            const request = axios.get('http://localhost:3000/likes'
            ,{
                params: {
                    postId: id,
                }
            })
            request.then((response) => {
                const { data,status } = response;
                if(status == 200){
                    resolve({ data });
                }else{
                    reject({ message : 'Error in retrive Data' });
                }
                
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };
}

const instance = new blogService();

export default instance;
