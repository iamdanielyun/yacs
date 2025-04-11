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