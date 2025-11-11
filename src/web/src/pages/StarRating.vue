<template>
  <div class="star-rating" :class="{ 'read-only': readOnly }">
    <!-- Hidden input for form integration -->
    <input 
      v-if="!readOnly"
      type="hidden" 
      :name="name" 
      :value="internalRating"
    >
    
    <!-- Stars Container -->
    <div class="stars-container">
      <span
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="getStarClass(star)"
        @click="!readOnly && setRating(star)"
        @mouseenter="!readOnly && setHoverRating(star)"
        @mouseleave="!readOnly && resetHoverRating()"
      >
        <!-- Star SVG -->
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 24 24" 
          :fill="getStarFill(star)" 
          stroke="#ffc107" 
          stroke-width="1"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        
        <!-- Partial star fill for decimal ratings -->
        <span 
          v-if="showPartialFill && getStarFill(star) === 'partial'"
          class="partial-fill"
          :style="{ width: getPartialFillWidth(star) + '%' }"
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 24 24" 
            fill="#ffc107" 
            stroke="#ffc107" 
            stroke-width="1"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </span>
      </span>
    </div>
    
    <!-- Rating Display (optional) -->
    <span 
      v-if="showRating && internalRating > 0" 
      class="rating-text"
      :class="ratingTextClass"
    >
      {{ displayRating }}
    </span>
    
    <!-- No Rating Text -->
    <span 
      v-else-if="showRating && internalRating === 0 && readOnly" 
      class="rating-text no-rating"
    >
      No ratings yet
    </span>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    // Current rating value
    rating: {
      type: [Number, String],
      default: 0
    },
    // Maximum number of stars
    maxStars: {
      type: Number,
      default: 5
    },
    // Whether the rating is read-only
    readOnly: {
      type: Boolean,
      default: false
    },
    // Whether to show the numeric rating
    showRating: {
      type: Boolean,
      default: true
    },
    // Size of stars in pixels
    starSize: {
      type: Number,
      default: 20
    },
    // Increment step (0.5 for half stars, 1 for whole stars)
    increment: {
      type: Number,
      default: 1
    },
    // Whether to show partial star fills for decimal ratings
    showPartialFill: {
      type: Boolean,
      default: true
    },
    // Active color for filled stars
    activeColor: {
      type: String,
      default: "#ffc107" // Bootstrap warning color (yellow)
    },
    // Inactive color for empty stars
    inactiveColor: {
      type: String,
      default: "#e4e5e9" // Light gray
    },
    // Name for form input
    name: {
      type: String,
      default: "rating"
    },
    // Text color for rating display
    textColor: {
      type: String,
      default: "#6c757d" // Bootstrap secondary color
    },
    // Custom CSS class for rating text
    ratingTextClass: {
      type: String,
      default: ""
    }
  },
};
</script>