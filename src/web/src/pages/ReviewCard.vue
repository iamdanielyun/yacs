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
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    voteHelpful() {
      this.$emit('helpful-vote', this.review.id);
    },
    reportReview() {
      this.$bvModal.msgBoxConfirm('Report this review as inappropriate?', {
        title: 'Report Review',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Report',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value) {
          // Handle report
          this.$bvToast.toast('Review reported successfully', {
            title: 'Report Submitted',
            variant: 'success',
            solid: true
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.review-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.review-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.reviewer {
  font-weight: bold;
  color: #495057;
}

.review-date, .review-course {
  font-size: 0.8rem;
  color: #6c757d;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.rating-number {
  font-weight: bold;
  color: #ffc107;
}

.review-breakdown {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  color: #6c757d;
}

.review-text {
  line-height: 1.5;
  margin-bottom: 15px;
  white-space: pre-wrap;
}

.review-actions {
  display: flex;
  gap: 10px;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}
</style>