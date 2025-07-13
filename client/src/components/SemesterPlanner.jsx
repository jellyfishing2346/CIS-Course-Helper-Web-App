import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const SemesterPlanner = () => {
  const [semesters, setSemesters] = useState({
    'fall-2024': { name: 'Fall 2024', courses: ['CISC 1115'] },
    'spring-2025': { name: 'Spring 2025', courses: ['CISC 2210', 'MATH 1201'] },
    'fall-2025': { name: 'Fall 2025', courses: [] },
    'spring-2026': { name: 'Spring 2026', courses: [] }
  });

  const [availableCourses] = useState([
    'CISC 3115', 'CISC 3130', 'CISC 3140', 'CISC 3220', 'CISC 3310', 
    'CISC 3320', 'CISC 3410', 'CISC 3440', 'MATH 1206', 'MATH 2501'
  ]);

  const onDragEnd = (result) => {
    // Handle drag and drop logic
    if (!result.destination) return;
    
    const { source, destination } = result;
    // Implementation for moving courses between semesters
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📅 4-Year Course Plan</h2>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {Object.entries(semesters).map(([semesterId, semester]) => (
            <Droppable key={semesterId} droppableId={semesterId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? '#e3f2fd' : '#f5f5f5',
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '1rem',
                    minHeight: '200px'
                  }}
                >
                  <h3>{semester.name}</h3>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    {semester.courses.length} courses • {semester.courses.length * 3} credits
                  </div>
                  
                  {semester.courses.map((course, index) => (
                    <Draggable key={course} draggableId={course} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging ? '#fff3e0' : 'white',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            padding: '0.75rem',
                            marginBottom: '0.5rem',
                            cursor: 'grab'
                          }}
                        >
                          {course}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Available Courses Sidebar */}
      <div style={{ 
        position: 'fixed',
        right: '20px',
        top: '100px',
        width: '250px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <h4>📚 Available Courses</h4>
        {availableCourses.map(course => (
          <div key={course} style={{
            padding: '0.5rem',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            cursor: 'grab'
          }}>
            {course}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemesterPlanner;
