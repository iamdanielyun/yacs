<template>
  <b-container class="mt-3">
    <section id="reviews">
      <h2>Course Reviews</h2>
        <div class="form-group">
        <label for="courseCode">Course Code:</label>
        <input
            v-model="courseCode"
            type="text"
            class="form-control"
            id="courseCode"
            placeholder="Enter course code (e.g., CSCI-1200)"
        />

        </div>
        <!-- Display average rating if reviews exist -->
        <div v-if="reviews.length > 0" class="average-rating mb-4">
            <h4>Average Rating</h4>
            <div class="d-flex align-items-center">
            <star-rating 
                :rating="averageRating" 
                :read-only="true"
                :star-size="30"
                :show-rating="true"
                rating-text-class="average-rating-text"
            />
            <span class="ml-3 rating-count">({{ reviews.length }} reviews)</span>
            </div>
        </div>

        <!-- Review Form -->
      <div class="review-form card mb-4">
        <div class="card-body">
          <h4 class="card-title">Write a Review</h4>
          
          <div class="form-group">
            <label>Your Rating:</label>
            <star-rating 
              v-model="rating"
              :increment="1"
              :star-size="30"
              :show-rating="true"
              active-color="#007bff"
              @rating-selected="onRatingSelected"
            />
          </div>
          
          <div class="form-group">
            <label for="reviewText">Your Review:</label>
            <textarea
              v-model="reviewText"
              class="form-control"
              id="reviewText"
              placeholder="Write your review here..."
              rows="4"
              maxlength="1000"
            ></textarea>
            <div class="text-right text-muted small mt-1">
              {{ reviewText.length }}/1000 characters
            </div>
          </div>
          
          <div class="form-group">
            <label for="result">Result:</label>
            <p id="result" class="result-message">{{ result }}</p>
          </div>
          
          <div class="form-buttons">
            <button @click="fetchReviews()" class="btn btn-primary">Fetch Reviews</button>
            <button @click="submitReview()" class="btn btn-success">Submit Review</button>
            <button @click="clearForm()" class="btn btn-danger">Clear Form</button>
          </div>
        </div>
      </div>

        <!-- Display Reviews -->
      <div v-if="reviews.length > 0" class="reviews-list">
        <h3>Reviews for {{ courseCode }}</h3>
        
        <!-- Sort Options -->
        <div class="sort-options mb-3">
          <label class="mr-2">Sort by:</label>
          <select v-model="sortBy" class="form-control form-control-sm d-inline-block w-auto">
            <option value="date">Most Recent</option>
            <option value="rating">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
        
        <ul class="list-group">
          <li v-for="(review, index) in sortedReviews" :key="index" class="list-group-item review-item">
            <div class="review-header">
              <div class="review-rating">
                <star-rating 
                  :rating="review.rating" 
                  :read-only="true"
                  :star-size="20"
                  :show-rating="false"
                  active-color="#ffc107"
                />
                <span class="rating-number ml-2">{{ review.rating }}/5</span>
              </div>
              <small class="text-muted">Submitted on: {{ review.date }}</small>
            </div>
            <div class="review-content mt-2">
              <p class="review-text">{{ review.text }}</p>
            </div>
            <div class="review-footer mt-2">
              <button 
                @click="voteHelpful(review.id)" 
                class="btn btn-sm btn-outline-primary"
                :class="{ 'btn-primary': review.userVotedHelpful }"
                :disabled="review.userVotedHelpful"
              >
                <i class="fas fa-thumbs-up"></i>
                Helpful ({{ review.helpfulCount || 0 }})
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="courseCode" class="mt-4 no-reviews">
        <div class="alert alert-info">
          <p>No reviews found for {{ courseCode }}. Be the first to review this course!</p>
        </div>
      </div>
      <div v-else class="mt-4 no-selection">
        <div class="alert alert-secondary">
          <p>Enter a course code above to see or submit reviews.</p>
        </div>
      </div>
    </section>
  </b-container>
</template>

<script>
import {
  fetchCourseReviews,
  submitCourseReview,
  voteHelpful as voteHelpfulService
} from "@/services/CourseService";
import StarRating from "@/components/StarRating.vue";

export default {
  name: "CourseReviewsPage",
  components: {
    StarRating
  },
  data() {
    return {
      courseCode: "",
      reviewText: "",
      rating: 0, // Start with 0 stars
      result: "",
      reviews: [],
      sortBy: "date",
      helpfulVotes: new Set() // Track which reviews user has voted helpful
    };
  },
  computed: {
    averageRating() {
      if (this.reviews.length === 0) return 0;
      const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
      return parseFloat((sum / this.reviews.length).toFixed(1));
    },
    sortedReviews() {
      const reviews = [...this.reviews];
      switch (this.sortBy) {
        case 'rating':
          return reviews.sort((a, b) => b.rating - a.rating);
        case 'helpful':
          return reviews.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
        case 'date':
        default:
          return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    }
  },
  methods: {
    async fetchReviews() {
      if (!this.courseCode) {
        this.result = "Please enter a course code.";
        return;
      }
      try {
        const response = await fetchCourseReviews(this.courseCode);
        this.reviews = response.data;
        this.result = `Fetched ${this.reviews.length} reviews for ${this.courseCode}.`;
      } catch (error) {
        this.result = "Failed to fetch reviews.";
        console.error(error);
      }
    },
    onRatingSelected(rating) {
      this.rating = rating;
    },
    async submitReview() {
      if (!this.courseCode || !this.reviewText || this.rating === 0) {
        this.result = "Please fill out all fields and select a rating.";
        return;
      }
      
      if (this.reviewText.length < 10) {
        this.result = "Review text must be at least 10 characters.";
        return;
      }
      
      try {
        const review = {
          courseCode: this.courseCode,
          text: this.reviewText,
          rating: this.rating,
          date: new Date().toLocaleDateString(),
        };
        const response = await submitCourseReview(review);
        this.result = "Review submitted successfully!";
        this.clearForm();
        this.fetchReviews(); // Refresh the reviews list
      } catch (error) {
        this.result = "Failed to submit review: " + (error.message || "Unknown error");
        console.error(error);
      }
    },
    clearForm() {
      this.reviewText = "";
      this.rating = 0; // Reset to 0 stars
    },
    async voteHelpful(reviewId) {
      if (this.helpfulVotes.has(reviewId)) {
        return; // Already voted
      }
      
      try {
        await voteHelpfulService(reviewId);
        
        // Update local state
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
          review.helpfulCount = (review.helpfulCount || 0) + 1;
          review.userVotedHelpful = true;
          this.helpfulVotes.add(reviewId);
        }
      } catch (error) {
        console.error("Failed to vote helpful:", error);
        this.result = "Failed to vote helpful. Please try again.";
      }
    }
  }
};
</script>





<style lang="scss">
    $primary: #007bff;
    $success: #28a745;
    $danger: #dc3545;

    .btn-primary {
    border-radius: 0;
    padding: 10px 20px;
    }

    .btn-success {
    border-radius: 0;
    padding: 10px 20px;
    }

    .btn-danger {
    border-radius: 0;
    padding: 10px 20px;
    }

    .success {
    animation: success ease-in-out 2s;
    }

    .fail {
        animation: fail ease-in-out 2s;
    }

    @keyframes success {
        50% {
            background-color: $success;
        }
        to {
            background-color: $primary;
        }
    }

    @keyframes fail {
        50% {
            background-color: $danger;
        }
        to {
            background-color: $primary;
        }
    }
    
    .list-group-item {
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>