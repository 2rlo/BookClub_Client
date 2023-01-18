// import React from "react";

// // book information
//             // book image, title, description, author, genre
//         // review text
//         // recommend book (top 3)

//         // reply write          
//         // reply write button
//         // reply list

// function DetailReviewPage() {
//     const navigate = useNavigate();

//     const user_token = sessionStorage.getItem("user_token");

//     const [review, setReview] = useState([]);

//     useEffect(() => {
//         getAllPosts();
//     });

//     const getAllPosts = async () => {
//         await axios.get(`${process.env.REACT_APP_SERVER}/v1/posts?size=10&page=1&sort=createdDate,desc`, {
//             headers: {
//                 "Authorization": "Bearer " + user_token
//             }
//         })
//             .then((res) => {
//                 console.log(res.data.response);
//                 setReviews(res.data.response);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     return (
//         <div></div>
//     )
// }

// export default DetailReviewPage;