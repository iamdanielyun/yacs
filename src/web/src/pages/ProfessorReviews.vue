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

      </div>
    </section>
  </b-container>
</template>