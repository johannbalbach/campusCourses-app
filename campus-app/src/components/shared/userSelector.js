import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const UserSelector = ({ teachers, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    const options = teachers.map(teacher => ({
        value: teacher.id,
        label: teacher.fullName
    }));

    return (
        <Form.Group controlId="formMainTeacher" className='mt-2'>
            <Form.Label>Основной преподаватель курса</Form.Label>
            <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectOption}
                placeholder="Выберите преподавателя"
                isClearable={true}
                isSearchable={true}
                required
            />
            <Form.Control.Feedback type="invalid">
                Выберите основного преподавателя
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default UserSelector;
