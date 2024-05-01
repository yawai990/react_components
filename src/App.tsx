import Select from "./components/form/select"


const options = [
  { label: 'Label 1', value: 'Value 1' },
  { label: 'Label 2', value: 'Value 2' },
  { label: 'Label 3', value: 'Value 3' },
  { label: 'Label 4', value: 'Value 4' },
  { label: 'Label 5', value: 'Value 5' },
  { label: 'Label 6', value: 'Value 6' },
  { label: 'Label 7', value: 'Value 7' },
  { label: 'Label 8', value: 'Value 8' },
  { label: 'Label 9', value: 'Value 9' },
  { label: 'Label 10', value: 'Value 10' }
];



function App() {
  return (
    <>
    <Select onChange={(value) =>console.log(value)} options={options} />
    <Select multiple onChange={(value) =>console.log(value)} options={options} />
    </>
  )
}

export default App
