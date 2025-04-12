const boards = [1, 2, 3];

export default function BoardsList() {
    return (
        <>
            {boards.map((board) => (
                <div className="bg-slate-400" key={board}>
                    {board}
                </div>
            ))}
        </>
    );
}
