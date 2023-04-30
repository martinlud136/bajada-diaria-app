
const Input = ({ label, ...resProps }) => {
  return (
    <>
      <h1>{label}</h1>
      <input type="file" {...resProps} />
    </>
  );
};

export default Input;
