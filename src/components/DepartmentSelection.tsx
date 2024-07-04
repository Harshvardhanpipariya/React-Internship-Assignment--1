import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface SubDepartment {
  id: number;
  name: string;
}

interface Department {
  id: number;
  department: string;
  sub_departments: SubDepartment[];
}

const DepartmentList: React.FC = () => {
  // Sample hardcoded JSON data
  const departments: Department[] = [
    {
      id: 1,
      department: "customer_service",
      sub_departments: [
        { id: 101, name: "support" },
        { id: 102, name: "customer_success" },
      ],
    },
    {
      id: 2,
      department: "design",
      sub_departments: [
        { id: 201, name: "graphic_design" },
        { id: 202, name: "product_design" },
        { id: 203, name: "web_design" },
      ],
    },
    // Add more departments as needed
  ];

  // State to manage selected departments and sub-departments
  const [selected, setSelected] = useState<number[]>([]);

  // Function to handle department or sub-department selection
  const handleToggle = (deptId: number) => () => {
    const currentIndex = selected.indexOf(deptId);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(deptId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  // Function to check if all sub-departments of a department are selected
  const isDepartmentFullySelected = (department: Department) => {
    const subDeptIds = department.sub_departments.map((subDept) => subDept.id);
    return subDeptIds.every((subDeptId) => selected.includes(subDeptId));
  };

  // Function to handle selecting all sub-departments of a department
  const handleSelectAllSubDepts = (department: Department) => () => {
    const subDeptIds = department.sub_departments.map((subDept) => subDept.id);
    const newSelected = selected.concat(
      subDeptIds.filter((subDeptId) => !selected.includes(subDeptId))
    );
    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem button onClick={handleToggle(department.id)}>
            <ListItemIcon>
              {department.sub_departments.length > 0 ? (
                selected.includes(department.id) ? (
                  <ExpandMoreIcon />
                ) : (
                  <ChevronRightIcon />
                )
              ) : null}
            </ListItemIcon>
            <Checkbox
              edge="start"
              checked={selected.includes(department.id)}
              onChange={handleToggle(department.id)}
              disableRipple
            />
            <ListItemText primary={department.department} />
          </ListItem>
          {department.sub_departments.length > 0 && (
            <Collapse
              in={selected.includes(department.id)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {department.sub_departments.map((subDept) => (
                  <ListItem
                    key={subDept.id}
                    button
                    onClick={handleToggle(subDept.id)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selected.includes(subDept.id)}
                        onChange={handleToggle(subDept.id)}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDept.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
