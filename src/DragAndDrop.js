import React from 'react';

function DragAndDrop({ children, onDrop }) {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = e.dataTransfer.getData("index");
    onDrop(parseInt(oldIndex), newIndex);
  };

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default DragAndDrop;
