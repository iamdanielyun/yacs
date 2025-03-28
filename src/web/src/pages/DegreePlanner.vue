<template>
    <b-container class="mt-3">
        <h2>Degree Progress Tracker</h2>
    
        <!-- Degree Selection -->
        <div class="form-group">
            <label for="degree">Select Degree:</label>
            <select v-model="selectedDegree" class="form-control" id="degree">
                <option v-for="degree in degrees" :value="degree.id" :key="degree.id">
                    {{ degree.name }}
                </option>
            </select>
        </div>

        <!-- Progress Visualization -->
        <div v-if="selectedDegree">
            <h3>{{ getDegreeName(selectedDegree) }}</h3>
            <div class="progress mb-3">
                <div 
                    class="progress-bar" 
                    :style="{ width: progressPercentage + '%' }"
                >
                    {{ progressPercentage }}% Complete
                </div>
            </div>
        </div>

        <!-- Course Requirements -->
        <div class="card mb-3" v-for="req in requirements" :key="req.category">
            <div class="card-header">
                <h5>{{ req.category }}</h5>
            </div>
        </div>
    </b-container>
</template>