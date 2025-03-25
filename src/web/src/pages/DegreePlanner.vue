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
            <!-- complete laterr -->
        </div>
    </b-container>
</template>