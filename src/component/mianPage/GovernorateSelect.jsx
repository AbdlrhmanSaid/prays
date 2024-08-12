import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const GovernorateSelect = ({
  governorate,
  handleChange,
  governorates,
  loading,
  error,
}) => {
  return (
    <FormControl style={{ width: "60%", color: "white" }}>
      <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
        المحافظة
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
            <MenuItem key={gov.id} value={gov.governorate_name_en}>
              {gov.governorate_name_ar}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default GovernorateSelect;
