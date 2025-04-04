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
        <div class="form-group">
            <label for="reviewText">Your Review:</label>
            <textarea
                v-model="reviewText"
                class="form-control"
                id="reviewText"
                placeholder="Write your review here..."
                rows="4"
            >
            </textarea>
        </div>
        <div class="form-group">
            <label for="rating">Rating:</label>
            <select v-model="rating" class="form-control" id="rating">
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
            </select>
        </div>
        <div class="form-group">
            <label for="result">Result:</label>
            <p id="result">{{ result }}</p>
        </div>
        <button @click="fetchReviews()" class="btn btn-primary">Fetch Reviews</button>
        <button @click="submitReview()" class="btn btn-success">Submit Review</button>
        <button @click="clearForm()" class="btn btn-danger">Clear Form</button>

        <!-- Display Reviews -->
        <div v-if="reviews.length > 0" class="mt-4">
            <h3>Reviews for {{ courseCode }}</h3>
            <ul class="list-group">
            <li v-for="(review, index) in reviews" :key="index" class="list-group-item">
                <strong>Rating:</strong> {{ review.rating }}/5<br />
                <strong>Review:</strong> {{ review.text }}<br />
                <small class="text-muted">Submitted on: {{ review.date }}</small>
            </li>
            </ul>
        </div>
        <div v-else class="mt-4">
            <p>No reviews found for this course.</p>
        </div>
    </section>
  </b-container>
</template>

<script>
    import {
        fetchCourseReviews,
        submitCourseReview,
    } from "@/services/CourseService";

    export default {
        name: "CourseReviewsPage",
        data() {
            return {
            courseCode: "",
            reviewText: "",
            rating: 5,
            result: "",
            reviews: [],
            };
        },

        methods: {

            //Get the reviews
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

            //Actually post/submite the reviews
            async submitReview() {
                if (!this.courseCode || !this.reviewText || !this.rating) {
                    this.result = "Please fill out all fields.";
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
                    this.result = "Failed to submit review.";
                    console.error(error);
                },
                clearForm() {
                    this.reviewText = "";
                    this.rating = 5;
                },
            }
        }
    }
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