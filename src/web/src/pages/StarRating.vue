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
        
      </span>
    </div>
  </div>
</template>
