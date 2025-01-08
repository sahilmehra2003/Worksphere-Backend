import Employee from "../models/employeeSchema.js";
import Department from "../models/departmentSchema.js"
import Project from "../models/projectSchema.js";
import ProjectTeam from "../models/projectTeamSchema.js";
export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by ID
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Use the department field to find the department
    const department = await Department.findById(employee.department).exec();
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Combine employee data with department details
    const response = {
      ...employee.toObject(),
      department: department.toObject(),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}
  
  // Controller to get all employees
  export const getAllEmployees = async (req, res) => {
    try {
      const { departmentId } = req.query;
  
      // Fetch all employees with populated department details
      const employees = await Employee.find().populate('department').exec();
      if (!employees.length) {
        return res.status(404).json({ message: 'No employees found' });
      }
      if (departmentId) {
        console.log("Filtering employees for department:", departmentId);
  
        // Find employees linked to the department ID
        const filteredEmployees = await Employee.find({ department: departmentId }).populate('department').exec();
  
        if (!filteredEmployees.length) {
          return res.status(404).json({ message: `No employees found for department ID: ${departmentId}` });
        }
  
        return res.status(200).json(filteredEmployees);
      }
  

      return res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
  
  export const createEmployee = async (req, res) => {
    // const { name, email, phoneNumber, city, state, country, department, position, teamName, workUnder, role, status } = req.body;
    try {
        
        const {name,email,phoneNumber,city,state,country,department,position,role,employmentStatus,currentProjects,projectTeam}=req.body;
        console.log("Payload received by server:", req.body);
        if (!name || !email || !phoneNumber || !city || !state || !country   || !department || !position || !role ) {
              return res.status(400).json({
                success:false,
                message:"Missing Fields"
              })
        }
        const newEmployee=await Employee.create({
          name:name,
          email:email,
          phoneNumber:phoneNumber,
          city:city,
          state:state,
          country:country,
          department:department,
          position:position,
          role:role,
          employmentStatus:employmentStatus
        })
       
        
    // updating employment array in department model
        if (department) {
          await Department.findByIdAndUpdate(
            department,
            { $push: { employees: newEmployee._id } },
            { new: true }
          );
        }
        if (currentProjects) {
           await Project.findByIdAndUpdate(
            currentProjects,
            {$push: {currentProjects:newEmployee._id}},
            {new:true}
           );
        }
        if (projectTeam) {
           await ProjectTeam.findByIdAndUpdate(
             projectTeam,
             {$push:{projectTeam:newEmployee._id}},
             {new:true}
           )
        }
        
        return res.status(200).json({
          success:true,
          message:"New employee created successfully!",
          employee:newEmployee
        })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:`Error is: ${error}`
      })
    }
    
};

// Update an employee by ID
export const updateEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body);
        if (!updatedEmployee) {
            return res.status(404).json(
              { 
                success:false,
                message: 'Employee not found' 
              });
        }
        return res.status(200).json({
          success:true,
          message:"Employee updated successfully",
          employee:updatedEmployee
        });
    } catch (error) {
        return res.status(400).json({ 
          success:false,
          message: `Error is:${error}` 
        });
    }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the employee
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update the department to remove the employee reference
    if (employee.department) {
      await Department.findByIdAndUpdate(employee.department, {
        $pull: { employees: id },
      });
    }
    
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};