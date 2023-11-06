import "./educard.scss";

export interface EduCardProps {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  level: string;
  onDlete: () => void;
  onEdit: () => void;
}

const EduCard = ({
  _id,
  name,
  startDate,
  endDate,
  description,
  level,
  onDlete,
  onEdit,
}: EduCardProps) => {
  return (
    <div id={_id}>
      <div className="main">
        <div className="card">
          <div className="card-title">
            <div style={{display: "flex", gap: "50px"}}>
            <h4>Education Name: <span>{name}</span></h4>
            <h3>Education Level: <span>{level}</span></h3>
            </div>
              <p>Description: <span>{description}</span></p>
              <div style={{display: "flex", gap: "50px"}}>
              <h3>Start Date: {startDate}</h3>
            <h3>End Date: {endDate}</h3>
              <div className="card-content-user-contact">
                <button onClick={onEdit}>
                  <h4>Edit</h4>
                </button>
                <button onClick={onDlete}>
                <h4>Delete</h4>
                </button>
              </div>
            </div>
            <div className="card-content-user-info">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduCard;
