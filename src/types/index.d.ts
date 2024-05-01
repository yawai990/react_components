
type optionsProps = {
    label: string;
    value: string | number;
  };
  
  type singleSelectProps = {
    multiple?: false;
    onChange: (value: optionsProps) => void;
  };
  type multiSelectProps = {
    multiple: true;
    onChange: (value: optionsProps[]) => void;
  };
  type selectProps = {
    options: optionsProps[];
    placeholder?: string;
    caret?:boolean,
    clear?:boolean,
    divider?:boolean,
  } & (singleSelectProps | multiSelectProps);
  