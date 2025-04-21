import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const Review = () => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { id } = useParams();

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
    const startId = Math.max(1, currentId - 9);
    const endId = currentId + 9;
    fetch(`https://dummyjson.com/products?limit=${endId - startId + 1}`)
      .then(res => res.json())
      .then(data => {
        const similar = data.products
          .filter(p => p.id !== currentId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);
        setSimilarProducts(similar);
      })
      .catch(console.error);
  };

  const renderStars = (rating, size = 'text-sm') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={solidStar} className={`text-yellow-400 ${size}`} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className={`text-yellow-400 ${size}`} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={regularStar} className={`text-yellow-400 ${size}`} />);
      }
    }

    return stars;
  };

  if (!product) {
    return <div className="text-center py-10">Loading product reviews...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Rating & Review Section */}
      <div className="rounded-lg shadow-sm p-4 mb-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-red-800">Rating & Reviews</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Rating Summary */}
          <div className="flex items-center justify-between p-3 border rounded-lg md:flex-col md:justify-center md:w-1/3">
            <div className="text-3xl font-bold text-red-600 md:mb-2">
              {product.rating}
            </div>
            <div className="flex mb-0 md:mb-2">
              {renderStars(product.rating)}
            </div>
            <p className="text-gray-600 text-xs md:text-sm">{reviews.length} reviews</p>
          </div>

          {/* Reviews */}
          <div className="space-y-2 md:space-y-3 md:w-2/3">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border p-2 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(Math.min(5, Math.max(1, review.id % 5)), 'text-xs')}
                      </div>
                      <h5 className="font-medium text-gray-700 text-xs md:text-sm">
                        {review.user.username}
                      </h5>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs md:text-sm mt-1 md:mt-0">
                    {review.body.length > 50 ? `${review.body.substring(0, 50)}...` : review.body}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-red-600 mb-3">You Might Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {similarProducts.map((similar) => (
            <div
              key={similar.id}
              className="border rounded-lg p-2 text-center hover:shadow-md transition cursor-pointer"
              onClick={() => {
                window.location.href = `/card/${similar.id}`; // ✅ Full page reload
              }}
            >
              <div className="h-20 mb-2 flex items-center justify-center">
                <img
                  src={similar.thumbnail}
                  alt={similar.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="font-medium text-xs truncate mb-1">{similar.title}</p>
              <p className="text-gray-600 text-xs">${similar.price}</p>
              <div className="flex justify-center mt-1">
                {renderStars(similar.rating, 'text-xs')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      <div className="rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-3 text-red-800">Write a Review</h2>
        <form className="space-y-3">
          <div>
            <label className="block text-red-700 text-sm mb-1">Your Rating</label>
            <div className="flex space-x-1 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="text-xl focus:outline-none"
                >
                  <FontAwesomeIcon icon={regularStar} className="text-yellow-400 hover:text-yellow-500" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 text-sm mb-1">Your Review</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
              rows="3"
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
