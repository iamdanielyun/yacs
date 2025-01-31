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
    </section>
  </b-container>
</template>