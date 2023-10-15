/**
 * @public
 */
export const Select = ({ onChange, className, options, value }) => (
  <select className={className} onChange={onChange} value={value}>
    <option hidden={true} value="" />
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
