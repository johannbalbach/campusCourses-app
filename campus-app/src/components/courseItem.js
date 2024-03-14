import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const CourseItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" defaultValue={item.title} />
          <input type="text" defaultValue={item.content} />
          <Button variant="primary" onClick={handleSaveClick}>Сохранить</Button>
          <Button variant="secondary" onClick={handleCancelClick}>Отменить</Button>
        </div>
      ) : (
        <div>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <Button variant="primary" onClick={handleEditClick}>Редактировать</Button>
          <Button variant="danger" onClick={handleDeleteClick}>Удалить</Button>
        </div>
      )}
    </div>
  );
};

export default CourseItem;