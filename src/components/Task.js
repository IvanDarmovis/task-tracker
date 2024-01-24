import { Button } from 'react-bootstrap';

function Task({ data, onRemove, onPin, onEdit, pinned }) {
  return (
    <div className='border border-primary rounded p-2 w-100 position-relative'>
      {pinned && (
        <p className='position-absolute start-50 translate-middle'>pinned</p>
      )}
      <div>
        <div className='d-flex justify-content-between gap-3 mt-2'>
          <p>{data.title}</p>
          <p>{data.startDate}</p>
        </div>
        <p className='text-center'>{data.description}</p>
      </div>
      <div className='d-flex justify-content-center gap-3'>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onPin}>Pin</Button>
        <Button onClick={onRemove}>Remove</Button>
      </div>
    </div>
  );
}

export default Task;
