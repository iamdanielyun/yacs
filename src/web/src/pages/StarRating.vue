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
    data() {
        return {
        internalRating: 0,
        hoverRating: 0,
        isHovering: false
        };
    },
    computed: {
        displayRating() {
        // Format the rating based on increment
        if (this.increment === 1) {
            return Math.round(this.internalRating * 10) / 10; // One decimal place
        } else {
            return this.internalRating.toFixed(1); // Always one decimal for half-stars
        }
        },
        currentDisplayRating() {
        return this.isHovering ? this.hoverRating : this.internalRating;
        }
    },
    watch: {
        rating: {
        immediate: true,
        handler(newVal) {
            this.internalRating = parseFloat(newVal) || 0;
        }
        }
    },
    methods: {
        // Set the rating when a star is clicked
        setRating(star) {
        if (this.readOnly) return;
        
        let newRating;
        
        if (this.increment === 0.5) {
            // For half-star increments
            const currentStarState = this.getStarFill(star);
            if (currentStarState === 'full') {
            newRating = star - 0.5;
            } else {
            newRating = star;
            }
        } else {
            // For whole-star increments
            newRating = star;
        }
        
        this.internalRating = newRating;
        this.$emit('update:rating', newRating);
        this.$emit('rating-selected', newRating);
        this.$emit('input', newRating); // For v-model support
        },
        
        // Handle hover effects
        setHoverRating(star) {
        if (this.readOnly) return;
        this.hoverRating = star;
        this.isHovering = true;
        },
        
        resetHoverRating() {
        if (this.readOnly) return;
        this.hoverRating = 0;
        this.isHovering = false;
        },
        
        // Determine star fill state
        getStarFill(star) {
        const rating = this.currentDisplayRating;
        
        if (this.increment === 0.5) {
            // Half-star logic
            if (rating >= star) return 'full';
            if (rating >= star - 0.5) return 'partial';
            return 'empty';
        } else {
            // Whole-star logic
            return rating >= star ? 'full' : 'empty';
        }
        },
        
        // Calculate partial fill width for decimal ratings
        getPartialFillWidth(star) {
        const rating = this.currentDisplayRating;
        const decimalPart = rating - (star - 1);
        return Math.max(0, Math.min(100, decimalPart * 100));
        },
        
        // Get CSS classes for each star
        getStarClass(star) {
        const fillState = this.getStarFill(star);
        const classes = [];
        
        classes.push(`star-${fillState}`);
        
        if (!this.readOnly) {
            classes.push('interactive');
            
            if (this.isHovering && this.hoverRating >= star) {
            classes.push('hover');
            }
        }
        
        return classes;
        }
    },
    mounted() {
        // Initialize with prop value
        this.internalRating = parseFloat(this.rating) || 0;
    }
};
</script>