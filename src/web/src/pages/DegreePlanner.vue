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

            <!-- Course Requirements -->
            <div class="card mb-3" v-for="req in requirements" :key="req.category">
                <div class="card-header">
                    <h5>{{ req.category }}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li 
                        class="list-group-item" 
                        v-for="course in req.courses" 
                        :key="course.code"
                        :class="{ 'text-success': isCourseCompleted(course.code) }"
                    >
                        <input 
                            type="checkbox" 
                            v-model="completedCourses" 
                            :value="course.code"
                        >
                        {{ course.code }}: {{ course.name }}
                    </li>
                </ul>
            </div>
            <button @click="savePlanner()" class="btn btn-success">Save Progress</button>
        </div>
    </b-container>
</template>

<script>
import { 
  fetchDegreeRequirements, 
  fetchDegreePlanner, 
  saveDegreePlanner 
} from "@/services/CoursePlannerService";

export default {
    name: "DegreePlanner",
    data() {
        return {
        degrees: [
            { id: "cs-bs", name: "Computer Science (BS)" },
            { id: "math-ba", name: "Mathematics (BA)" },
        ],
        selectedDegree: null,
        requirements: [],
        completedCourses: [],
        };
    },
    computed: {
    progressPercentage() {
      if (!this.requirements.length) return 0;
      const total = this.requirements.flatMap(req => req.courses).length;
      return Math.round((this.completedCourses.length / total) * 100);
    }
  },
  methods: {
    async loadRequirements() {
      this.requirements = await fetchDegreeRequirements(this.selectedDegree);
      const planner = await fetchDegreePlanner("current-user-id");
      this.completedCourses = planner?.completedCourses || [];
    },
    isCourseCompleted(code) {
      return this.completedCourses.includes(code);
    },
    async savePlanner() {
      await saveDegreePlanner("current-user-id", {
        degree: this.selectedDegree,
        completedCourses: this.completedCourses,
      });
      alert("Progress saved!");
    },
    getDegreeName(id) {
      return this.degrees.find(d => d.id === id)?.name || "";
    },
  },
  watch: {
    selectedDegree() {
      this.loadRequirements();
    }
  }
};
</script>
<style scoped>
/* Container and Layout */
.planner-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Degree Selection Dropdown */
.degree-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}

.degree-select:focus {
  border-color: #80bdff;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Progress Bar Animation */
.progress {
  height: 25px;
  margin-bottom: 25px;
  border-radius: 4px;
  background-color: #e9ecef;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #28a745;
  transition: width 0.5s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

/* Dynamic progress bar colors based on completion percentage */
.progress-bar.low {
  background-color: #dc3545; /* Red for < 30% */
}
.progress-bar.medium {
  background-color: #ffc107; /* Yellow for 30-70% */
}
.progress-bar.high {
  background-color: #28a745; /* Green for > 70% */
}

/* Requirement Cards */
.requirement-card {
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.requirement-card:hover {
  transform: translateY(-2px);
}
</style>