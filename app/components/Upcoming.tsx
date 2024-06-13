import React from 'react';

interface UpcomingProps {
    nextShape: number[];
    columns: number;
}

const Upcoming: React.FC<UpcomingProps> = ({ nextShape, columns }) => {
    const rows = 4;
    const previewColumns = 4;
    const previewGrid = Array(rows * previewColumns).fill(false);

    const previewShape = nextShape.map(index => {
        const x = index % columns;
        const y = Math.floor(index / columns);
        // Shifting shape to center of 4x4 preview
        return (y + 1) * previewColumns + (x - 4);
    });

    const gridItems = [];
    for (let i = 0; i < rows * previewColumns; i++) {
        const isShape = previewShape.includes(i);
        gridItems.push(
            <div
                key={i}
                className={`col-span-1 border ${isShape ? 'bg-slate-500' : 'border-gray-500'}`}
                style={{ height: '20px', width: '20px' }}
            >
                &nbsp;
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center my-4">
            <div className="grid grid-cols-4 gap-1 justify-center items-center">
                {gridItems}
            </div>
        </div>
    );
}

export default Upcoming;
