import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';

function AddTask({ onSubmit, editData, onEdit, onReset }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const formSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      startDate: startDate.toLocaleDateString()
    };

    editData ? onEdit({ ...editData, ...newTask }) : onSubmit(newTask);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate(new Date());
    editData && onReset();
  };

  const clearForm = (e) => {
    e.preventDefault();
    resetForm();
  };

  useEffect(() => {
    if (!editData) return;
    setTitle(editData.title);
    setDescription(editData.description);
    setStartDate(
      editData.startDate ? new Date(editData.startDate) : new Date()
    );
  }, [editData]);

  return (
    <form
      className='border border-primary rounded p-2 w-100'
      onSubmit={formSubmit}
    >
      <div>
        <div className='form-control d-flex justify-content-between gap-3 mb-3'>
          <label htmlFor='taskTittle' className='w'>
            Task title
          </label>
          <input
            id='taskTittle'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-control d-flex justify-content-between gap-3 mb-3'>
          <label htmlFor='datepicker'>Choose start date</label>
          <ReactDatePicker
            id='datepicker'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <div className='form-control mb-3'>
        <label htmlFor='formDescription'>Task description</label>
        <textarea
          id='formDescription'
          className='w-100'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='d-flex justify-content-center gap-3'>
        <Button type='submit'>{editData ? 'Save' : 'Add'}</Button>
        <Button type='reset' onClick={clearForm}>
          {editData ? 'Cancel' : 'Clear'}
        </Button>
      </div>
    </form>
  );
}

export default AddTask;
