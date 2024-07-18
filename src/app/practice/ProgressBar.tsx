import { FC } from "react";

interface ProgressBarProps {
  Current: number;
  Max: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ Current, Max }) => {
  const percentage = (100 * Current) / Max;
  const percentageString = `${percentage}%`;

  return (
    <div className="w-full h-1 bg-gray-50">
      <div className="bg-blue-600 h-1 rounded-lg" style={{ width: percentageString }} />
    </div>
  );
};

export default ProgressBar;
