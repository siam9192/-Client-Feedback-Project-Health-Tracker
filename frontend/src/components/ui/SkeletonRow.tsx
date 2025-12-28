interface Props {
  dataCount: number;
}
const SkeletonRow = ({ dataCount = 6 }: Props) => (
  <tr className="animate-pulse">
    {Array.from({ length: dataCount }).map((_, idx) => (
      <td key={idx} className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

export default SkeletonRow;
