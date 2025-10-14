<template>
  <b-container class="mt-3">
    <section id="professor-reviews">
      <h2>Professor Reviews & Ratings</h2>
      
      <!-- Professor Search -->
      <div class="form-group">
        <label for="professorSearch">Search Professor:</label>
        <input 
          v-model="searchQuery" 
          @input="searchProfessors" 
          type="text" 
          class="form-control" 
          id="professorSearch" 
          placeholder="Enter professor name or department"
        />
      </div>
      <div v-if="searchResults.length" class="search-results">
          <div 
            v-for="prof in searchResults" 
            :key="prof.id" 
            class="search-result-item"
            @click="selectProfessor(prof)"
          >
            {{ prof.name }} - {{ prof.department }}
          </div>
      </div>

    <!-- Selected Professor Display -->
      <div v-if="selectedProfessor" class="professor-info">
        <h3>{{ selectedProfessor.name }}</h3>
        <p><strong>Department:</strong> {{ selectedProfessor.department }}</p>
        
        <!-- Overall Ratings -->
        <div class="ratings-summary">
          <div class="rating-item">
            <span>Overall: </span>
            <star-rating :rating="overallRating" :read-only="true" />
            <span>({{ totalReviews }} reviews)</span>
          </div>
          <div class="rating-breakdown">
            <div>Teaching Quality: {{ breakdown.teaching }}/5</div>
            <div>Grading Fairness: {{ breakdown.grading }}/5</div>
            <div>Accessibility: {{ breakdown.accessibility }}/5</div>
          </div>
        </div>

        <!-- Review Form -->
        <div class="review-form">
          <h4>Write a Review</h4>
          <div class="form-group">
            <label>Teaching Quality:</label>
            <star-rating v-model="newReview.teaching" />
          </div>
          <div class="form-group">
            <label>Grading Fairness:</label>
            <star-rating v-model="newReview.grading" />
          </div>
          <div class="form-group">
            <label>Accessibility:</label>
            <star-rating v-model="newReview.accessibility" />
          </div>
          <div class="form-group">
            <label>Review:</label>
            <textarea 
              v-model="newReview.text" 
              class="form-control" 
              rows="4" 
              placeholder="Share your experience with this professor..."
            />
          </div>
          <button @click="submitReview" class="btn btn-success">Submit Review</button>
        </div>
        
        <!-- Reviews List -->
        <div class="reviews-list">
          <h4>Student Reviews</h4>
          <div 
            v-for="review in professorReviews" 
            :key="review.id" 
            class="review-card"
          >
            <div class="review-header">
              <star-rating :rating="calculateOverall(review)" :read-only="true" />
              <span class="review-date">{{ review.date }}</span>
            </div>
            <p class="review-text">{{ review.text }}</p>
            <div class="review-breakdown">
              <small>Teaching: {{ review.teaching }}/5 • Grading: {{ review.grading }}/5 • Accessibility: {{ review.accessibility }}/5</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  </b-container>
</template>