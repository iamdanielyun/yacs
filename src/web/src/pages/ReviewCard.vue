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
      
      <div class="review-breakdown">
        <span>Teaching: {{ review.teaching }}/5</span>
        <span>Grading: {{ review.grading }}/5</span>
        <span>Accessibility: {{ review.accessibility }}/5</span>
        <span>Difficulty: {{ review.difficulty }}/5</span>
      </div>
      
      <p class="review-text">{{ review.text }}</p>
      
      <div class="review-actions">
        <button 
          @click="voteHelpful" 
          class="btn btn-sm btn-outline-primary"
          :class="{ 'btn-primary': review.userVotedHelpful }"
          :disabled="review.userVotedHelpful"
        >
          <i class="fas fa-thumbs-up"></i>
          Helpful ({{ review.helpfulCount || 0 }})
        </button>
        <button @click="reportReview" class="btn btn-sm btn-outline-secondary">
          <i class="fas fa-flag"></i>
          Report
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "@/components/StarRating.vue";

export default {
  name: "ReviewCard",
  components: {
    StarRating
  },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  computed: {
    overallRating() {
      return (this.review.teaching + this.review.grading + this.review.accessibility) / 3;
    }
  },
  methods: {
        //fill this out 
  }
};
</script>