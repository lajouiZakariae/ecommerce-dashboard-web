export default function TableLoading() {
    return (
        <>
            {[...Array(10).keys()].map((index) => (
                <tr key={index}>
                    <td colSpan={8}>
                        <div className="my-1 h-8 bg-[#e7e7e7] rounded-full dark:bg-gray animate-pulse"></div>
                    </td>
                </tr>
            ))}
        </>
    );
}
