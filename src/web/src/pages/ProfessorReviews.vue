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
    </section>
  </b-container>
</template>