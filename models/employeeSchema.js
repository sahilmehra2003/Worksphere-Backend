import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
      trim: true 
    },
    phoneNumber: { 
      type: String, 
      required: true, 
      match: /^\d{10}$/, // Example for 10-digit phone numbers
      trim: true 
    },
    city: { 
      type: String, 
      required: true, 
      trim: true 
    },
    state: { 
      type: String, 
      required: true, 
      trim: true 
    },
    country: { 
      type: String, 
      required: true, 
      trim: true 
    },
    department: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Department" 
    },
    position: { 
      type: String, 
      required: true, 
      trim: true 
    },
    client: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Client", 
        default: null 
      }
    ],
    projectTeam: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "ProjectTeam", 
      default: null 
    },
    currentProjects: 
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        default: null 
      },
    role: { 
      type: String, 
      enum: ["TeamHead", "Employee","DepartmentHead"], 
      default: "Employee" 
    },
    employmentStatus: { 
      type: String, 
      enum: ["working", "resigned"], 
      default: "working" 
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
