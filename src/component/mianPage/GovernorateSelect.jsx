import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
const GovernorateSelect = ({
  governorate,
  handleChange,
  governorates,
  loading,
  error,
}) => {
  const { isEnglish } = useSelector((state) => state.lang);

  return (
    <FormControl style={{ width: "60%", color: "white" }}>
      <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
        {isEnglish ? "City" : "المدينة"}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={governorate}
        label="Governorate"
        onChange={handleChange}
        style={{ color: "white" }}
      >
        {loading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : error ? (
          <MenuItem disabled>Error Loading Governorates: {error}</MenuItem>
        ) : (
          governorates.map((gov) => (
            <MenuItem
              key={gov.id}
              value={
                isEnglish ? gov.governorate_name_en : gov.governorate_name_ar
              }
            >
              {isEnglish ? gov.governorate_name_en : gov.governorate_name_ar}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default GovernorateSelect;
