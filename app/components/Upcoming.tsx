const Upcoming = () => {
    const rows = 12;
    const columns = 4;
    const gridItems = [];
    

    const isShape = (i: number) => {
        // Square shape
        const squarePositions = [
            5,6,9,10
        ];

        // L shape
        const lPositions = [
            16,20,24,28
        ];

        // J shape
        const jPositions = [
            19,23,26,27
        ];

        // Z shape
        const zPositions = [
            37,38,42,43
        ];

        return squarePositions.includes(i) ||
               lPositions.includes(i) ||
               jPositions.includes(i) ||
               zPositions.includes(i);
    }

    for (let i = 0; i < rows * columns; i++) {
        gridItems.push(
            <div
                key={i}
                className={`col-span-1 border ${isShape(i) ? 'border-slate-100 bg-slate-500 px-1' : 'border-gray-500 px-2'}`}
            >
                &nbsp;
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center border border-black my-4">
            <div className="grid grid-cols-4 justify-center items-center">
                {gridItems}
            </div>
        </div>
    );
}

export default Upcoming;
