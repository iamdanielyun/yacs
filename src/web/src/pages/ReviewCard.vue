<template>
  <div class="review-card card mb-3">
    <div class="card-body">
      <div class="review-header">
        <div class="review-meta">
          <span v-if="!review.anonymous" class="reviewer">{{ review.studentName || 'Anonymous Student' }}</span>
          <span v-else class="reviewer">Anonymous</span>
          <span class="review-date">{{ formatDate(review.date) }}</span>
          <span class="review-course" v-if="review.courseCode">{{ review.courseCode }}</span>
        </div>
        <div class="review-rating">
          <star-rating 
            :rating="overallRating" 
            :read-only="true" 
            :show-rating="false"
            star-size="16"
          />
          <span class="rating-number">{{ overallRating.toFixed(1) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
