import { useState } from "react";
import styles from "./Select.module.css";

const Select = ({
  multiple,
  options,
  placeholder,
  caret = true,
  clear = true,
  divider = true,
  onChange,
}: selectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<optionsProps | null>();
  const [multiSelect, setMultiSelect] = useState<optionsProps[] | []>([]);

  const clearAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (multiple) {
      setMultiSelect([]);
    }
    setSelectedValue(null);
  };
  const handleSelectedValue = (data: optionsProps) => {
    // * already exist ,remove back
    setIsOpen(false);
    if (multiple) {
      if (multiSelect.find((mul) => mul.label === data.label)) {
        const filterData = multiSelect.filter(
          (val) => val.value !== data.value
        );
        onChange(filterData);
        setMultiSelect(filterData);
      } else {
        onChange([...multiSelect, data]);
        setMultiSelect([...multiSelect, data]);
      }
    } else {
      onChange(data);
      setSelectedValue(selectedValue?.label === data.label ? null : data);
    }
  };

  return (
    <div
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className={`${styles.container} focus:border-red-600`}
    >
      <span
        className={`${styles.value} ${
          !selectedValue && !multiSelect.length && styles.placeholder
        }`}
      >
        {multiple
          ? multiSelect.length
            ? multiSelect.length > 3
              ? `${multiSelect.length} selected`
              : multiSelect.map((data) => (
                  <button
                    key={data.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectedValue(data);
                    }}
                    className={`${styles.selected_data} ${styles.selected_animated}`}
                  >
                    {data.label}
                    <span className={styles["remove_btn"]}>&times;</span>
                  </button>
                ))
            : placeholder ?? "Select..."
          : selectedValue
          ? selectedValue.label
          : placeholder ?? "Select..."}
      </span>
      {clear && (
        <button
          onClick={clearAll}
          className={`${styles["clear-btn"]} ${
            selectedValue || multiSelect.length ? styles.show : styles.hide
          }`}
        >
          &times;
        </button>
      )}
      {divider && <div className={styles.divider} />}
      {caret && (
        <div className={styles.caret} onClick={() => setIsOpen(!open)} />
      )}
      {/* @ options box */}
      <ul className={`${styles.options} ${isOpen ? styles.popover_show : ""}`}>
        {options.map((opt, idx) => (
          <li
            key={idx}
            className={`
            ${styles.option}
            ${selectedValue?.label === opt.label && styles.highlighted}
            ${
              multiSelect.find((o) => o.label === opt.label) &&
              styles.highlighted
            }
            `}
            onClick={() => handleSelectedValue(opt)}
          >
            {opt.label}
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default Select;
