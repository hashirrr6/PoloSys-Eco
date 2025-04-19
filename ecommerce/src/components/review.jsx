import React from "react";
import { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const Review = () => {
    const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
 
    fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct(data);
    
      fetchSimilarProducts(data.id);
    })
    .catch(console.error);

    fetch(`https://dummyjson.com/comments`)
    .then((res) => res.json())
    .then(data => setReviews(data.comments.slice(0, 3)))
    .catch(console.error);
}, [id]);
const fetchSimilarProducts = (currentId) => {
    // Calculate range of IDs to fetch (currentId ± 5)
    const startId = Math.max(1, currentId - 9);
    const endId = currentId + 9;
    fetch(`https://dummyjson.com/products?limit=${endId-startId+1}`)
    .then(res => res.json())
    .then(data => {
      // Filter out current product and get 4 random products from the range
      const similar = data.products
        .filter(p => p.id !== currentId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);
      setSimilarProducts(similar);
    })
    .catch(console.error);
};


  if (!product) {
    return <div className="text-center py-10">Loading product reviews...</div>;
  }

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={regularStar} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Rating & Review Section */}
      <div className=" rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-red-800">Rating & Reviews </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rating Summary */}
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
            <div className="text-5xl font-bold text-red-600 mb-2">
              {product.rating}
            </div>
            <div className="flex mb-2">
              {renderStars(product.rating)}
            </div>
            <p className="text-gray-600">{reviews.length} reviews</p>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-700">{review.user.username}</h5>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {renderStars(Math.min(5, Math.max(1, review.id % 5)))} {/* Sample rating based on id */}
                  </div>
                  <p className="text-gray-700">{review.body}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mb-8">
        <h2 className="text-xl text-red-600 font-semibold mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-8 text-red-600 md:grid-cols-4 gap-4">
          {similarProducts.map((similar) => (
            
            <div 
            key={similar.id}
            className="border rounded-lg p-4 text-center hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              setTimeout(() => {
                window.location.href = `/card/${similar.id}`;
              }, 1000); // navigates and refreshes after 3 seconds
            }}>
                
              <div className="h-32 mb-2 flex items-center justify-center text-red-600">
                <img 
                  src={similar.thumbnail} 
                  alt={similar.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="font-medium truncate">{similar.title}</p>
              <p className="text-gray-600">${similar.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      <div className=" text-red-500 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-red-700 mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" className="text-2xl">
                  <FontAwesomeIcon icon={regularStar} className="text-yellow-400 hover:text-yellow-500" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 mb-2">Your Review</label>
            <textarea 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Share your thoughts about this product..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;



