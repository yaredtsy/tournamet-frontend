import React, { useMemo, useState } from "react";
import { useAsyncDebounce } from "react-table";
import { Label, Input } from "reactstrap";

interface GlobalFilterPros {
  globalFilter: any;
  setGlobalFilter: any;
}
const GlobalFilter: React.FC<GlobalFilterPros> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  });

  return (
    <div>
      <Label>Search Table: </Label>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder=" Enter value "
        className="w-25"
        style={{
          fontSize: "1.1rem",
          margin: "15px",
          display: "inline",
        }}
      />
    </div>
  );
};

interface DefaultFilterForColumnProps {
  column: {
    filterValue: any;
    preFilteredRow: { length: any };
    setFilter: any;
  };
}

export const DefaultFilterForColumn: React.FC<DefaultFilterForColumnProps> = ({
  column: {
    filterValue,
    preFilteredRow: { length },
    setFilter,
  },
}) => {
  return (
    <Input
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search`}
      style={{ marginTop: "10px" }}
    />
  );
};
interface SelectColumnFilterProps {
  column: {
    filterValue: any;
    setFilter: any;
    preFilteredRows: any[];
    id: number;
  };
}
export const SelectColumnFilter: React.FC<SelectColumnFilterProps> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return Array.from(options.values());
  }, [id, preFilteredRows]);
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default GlobalFilter;
