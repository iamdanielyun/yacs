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
    </section>
  </b-container>
</template>