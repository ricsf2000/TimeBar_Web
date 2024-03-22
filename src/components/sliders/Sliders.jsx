import './sliders.css';
import ReactSlider from 'react-slider';

const Sliders = ({ taskId, completionStatus, onChange }) => {
  return (
    <div className='slider__header'>
      <ReactSlider
        className="taskProgress" trackClassName="taskProgress-track" thumbClassName="taskProgress-thumb" value={completionStatus} onChange={(newValue) => onChange(taskId, newValue)} marks={10} min={0} max={100} 
      />
      <p> {completionStatus}% </p>
    </div>
  );
};

export default Sliders
