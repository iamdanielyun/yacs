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
        <!-- TODO -->

      </div>
    </section>
  </b-container>
</template>