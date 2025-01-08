import mongoose from "mongoose";

// Define the goal schema
const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Not Started'],
    required: true
  }
}, { _id: false });  // _id: false makes sure each goal does not have its own _id field

// Define the employee performance schema
const employeePerformanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Employee",
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  monthlyOvertimeHours: {
    type: [Number],
    required: true
  },
  monthlyClientRatings: {
    type: [Number],
    required: true
  },
  monthlyContributions: {
    type: [Number],
    required: true
  },
  goals: {
    type: [goalSchema],
    required: true
  }
});

// Create the EmployeePerformance model from the schema
const EmployeePerformance = mongoose.model('EmployeePerformance', employeePerformanceSchema);

export default EmployeePerformance
